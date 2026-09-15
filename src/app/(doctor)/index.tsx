import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constants/colors';

type PatientSummary = {
  id: string;
  full_name: string;
  last_severity: number | null;
  last_log_at: string | null;
};

export default function DoctorHome() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPatients = useCallback(async () => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'patient');

    if (error || !profiles) {
      setPatients([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    const results: PatientSummary[] = await Promise.all(
      profiles.map(async (p) => {
        const { data: lastLog } = await supabase
          .from('symptom_logs')
          .select('severity, created_at')
          .eq('patient_id', p.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        return {
          id: p.id,
          full_name: p.full_name,
          last_severity: lastLog?.severity ?? null,
          last_log_at: lastLog?.created_at ?? null,
        };
      })
    );

    setPatients(results);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPatients();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Meus pacientes</Text>
          <Text style={styles.subtitle}>{patients.length} pacientes monitorados</Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Nenhum paciente encontrado.</Text> : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(doctor)/patient/${item.id}`)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.full_name?.charAt(0)?.toUpperCase() ?? '?'}
              </Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.full_name}</Text>
              <Text style={styles.cardMeta}>
                {item.last_log_at
                  ? `Último registro: ${new Date(item.last_log_at).toLocaleDateString('pt-BR')}`
                  : 'Sem registros ainda'}
              </Text>
            </View>
            {item.last_severity !== null && (
              <View style={[styles.severityBadge, severityColor(item.last_severity)]}>
                <Text style={styles.severityBadgeText}>{item.last_severity}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

function severityColor(severity: number) {
  if (severity >= 4) return { backgroundColor: '#FDE2E2' };
  if (severity === 3) return { backgroundColor: '#FEF3C7' };
  return { backgroundColor: '#DCFCE7' };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8,
  },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  logout: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  list: { padding: 24, paddingTop: 8 },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 40 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.cardBg, borderRadius: 14,
    padding: 14, marginBottom: 12,
  },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  avatarText: { color: colors.primary, fontWeight: '800', fontSize: 16 },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', color: colors.text },
  cardMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  severityBadge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  severityBadgeText: { fontWeight: '800', color: colors.text },
});