import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { colors } from '../../../constants/colors';

type Log = {
  id: string;
  symptoms: string;
  severity: number;
  notes: string | null;
  created_at: string;
};

export default function PatientDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [patientName, setPatientName] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', id)
        .single();
      if (profile) setPatientName(profile.full_name);

      const { data: symptomLogs } = await supabase
        .from('symptom_logs')
        .select('*')
        .eq('patient_id', id)
        .order('created_at', { ascending: false });

      setLogs(symptomLogs ?? []);
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{patientName || 'Paciente'}</Text>
      <Text style={styles.subtitle}>Histórico de sintomas</Text>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Nenhum registro ainda.</Text> : null
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardDate}>
                {new Date(item.created_at).toLocaleString('pt-BR')}
              </Text>
              <View style={[styles.severityBadge, severityColor(item.severity)]}>
                <Text style={styles.severityBadgeText}>{item.severity}</Text>
              </View>
            </View>
            <Text style={styles.cardSymptoms}>{item.symptoms}</Text>
            {item.notes ? <Text style={styles.cardNotes}>{item.notes}</Text> : null}
          </View>
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
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24 },
  headerRow: { paddingTop: 16 },
  back: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 12 },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: 16 },
  list: { paddingBottom: 24 },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 40 },
  card: { backgroundColor: colors.cardBg, borderRadius: 14, padding: 14, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardDate: { fontSize: 12, color: colors.textMuted },
  severityBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  severityBadgeText: { fontWeight: '800', color: colors.text, fontSize: 13 },
  cardSymptoms: { fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 8 },
  cardNotes: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
});