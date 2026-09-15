import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Alert, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constants/colors';

const vitals = [
  { label: 'Frequência', value: '78 bpm' },
  { label: 'SpO2',        value: '97%'    },
  { label: 'Temperatura', value: '36.6°C' },
  { label: 'Passos',      value: '3.241 hoje' },
];

const fields = [
  {
    key: 'estado',
    label: 'Estado geral',
    options: ['Ótimo', 'Bem', 'Regular', 'Mal', 'Muito mal'],
  },
  {
    key: 'dor',
    label: 'Nível de dor',
    options: ['Sem dor', 'Leve', 'Moderada', 'Intensa', 'Insuportável'],
  },
  {
    key: 'sono',
    label: 'Como dormiu esta noite?',
    options: ['Muito bem', 'Bem', 'Regular', 'Mal', 'Não consegui dormir'],
  },
  {
    key: 'apetite',
    label: 'Apetite hoje',
    options: ['Normal', 'Aumentado', 'Reduzido', 'Sem apetite'],
  },
  {
    key: 'sintomas',
    label: 'Sintomas presentes',
    options: ['Nenhum', 'Tontura', 'Falta de ar', 'Náusea', 'Dor de cabeça', 'Fraqueza'],
  },
  {
    key: 'medicacao',
    label: 'Tomou a medicação hoje?',
    options: ['Sim, todas', 'Sim, parcialmente', 'Não tomei', 'Não uso medicação'],
  },
  {
    key: 'humor',
    label: 'Como está seu humor?',
    options: ['Muito bem', 'Bem', 'Ansioso', 'Triste', 'Irritado'],
  },
];

const severityFromDor: Record<string, number> = {
  'Sem dor': 1,
  'Leve': 2,
  'Moderada': 3,
  'Intensa': 4,
  'Insuportável': 5,
};

export default function PatientScreen() {
  const { session, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();
      if (data) setFullName(data.full_name);
    };
    loadProfile();
  }, [session]);

  const select = (key: string, option: string) => {
    setValues((prev) => ({ ...prev, [key]: option }));
    setOpenKey(null);
  };

  const handleSubmit = async () => {
    if (Object.keys(values).length === 0) {
      Alert.alert('Atenção', 'Preencha pelo menos um campo antes de enviar.');
      return;
    }

    setSubmitting(true);

    const symptomsText = Object.entries(values)
      .map(([key, value]) => {
        const field = fields.find((f) => f.key === key);
        return `${field?.label}: ${value}`;
      })
      .join('\n');

    const severity = values['dor'] ? severityFromDor[values['dor']] ?? 1 : 1;

    const { error } = await supabase.from('symptom_logs').insert({
      patient_id: session?.user.id,
      symptoms: symptomsText,
      severity,
      notes: null,
    });

    setSubmitting(false);

    if (error) {
      Alert.alert('Erro ao enviar', error.message);
      return;
    }

    Alert.alert('Enviado!', 'Seus dados foram registrados e enviados ao posto de saúde.');
    setValues({});
  };

  const handleEmergencyCall = () => {
    const phoneNumber = '+5535999730024';

    Alert.alert(
      'Ligar para emergência',
      'Deseja ligar agora para o hospital/posto de saúde?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Ligar agora',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`).catch(() => {
              Alert.alert('Erro', 'Não foi possível abrir o discador.');
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <View style={styles.logoIcon} />
          <Text style={styles.logoText}>
            Health<Text style={{ fontWeight: '400' }}>Link</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Área do paciente</Text>
          <Text style={styles.heroTitle}>Olá, {fullName || 'paciente'}</Text>
          <Text style={styles.heroSubtitle}>
            Registre como você está se sentindo hoje. Seus dados serão enviados ao posto de saúde.
          </Text>
        </View>

        {/* Botão de emergência */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
          <Text style={styles.emergencyIcon}>🚨</Text>
          <Text style={styles.emergencyText}>Ligar para emergência</Text>
        </TouchableOpacity>

        {/* Vitals grid */}
        <View style={styles.grid}>
          {vitals.map((v) => (
            <View key={v.label} style={styles.vitalCard}>
              <Text style={styles.vitalLabel}>{v.label}</Text>
              <Text style={styles.vitalValue}>{v.value}</Text>
            </View>
          ))}
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Como você está se sentindo?</Text>
          <Text style={styles.formSubtitle}>Preencha os campos abaixo.</Text>

          {fields.map((field) => (
            <View key={field.key} style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <TouchableOpacity
                style={styles.select}
                onPress={() => setOpenKey(openKey === field.key ? null : field.key)}
              >
                <Text style={values[field.key] ? styles.selectValue : styles.selectPlaceholder}>
                  {values[field.key] || 'Selecione'}
                </Text>
                <Text style={styles.chevron}>
                  {openKey === field.key ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              {openKey === field.key && (
                <View style={styles.dropdown}>
                  {field.options.map((o) => (
                    <TouchableOpacity
                      key={o}
                      style={styles.dropdownItem}
                      onPress={() => select(field.key, o)}
                    >
                      <Text style={styles.dropdownText}>{o}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Botão */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={styles.submitText}>
              {submitting ? 'Enviando...' : 'Enviar para o posto de saúde →'}
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: colors.white,
  },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { width: 28, height: 28, borderRadius: 6, backgroundColor: colors.primary },
  logoText: { fontSize: 16, fontWeight: '700', color: colors.text },
  logoutText: { fontSize: 14, fontWeight: '600', color: colors.primary, paddingHorizontal: 8 },

  content: { padding: 24, paddingTop: 0, paddingBottom: 48 },

  hero: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16, padding: 24, marginBottom: 20,
  },
  heroLabel: { fontSize: 12, fontWeight: '700', color: colors.primary, marginBottom: 8 },
  heroTitle: { fontSize: 30, fontWeight: '800', color: colors.text, marginBottom: 10 },
  heroSubtitle: { fontSize: 14, color: colors.textMuted, lineHeight: 22 },

  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 20,
  },
  emergencyIcon: { fontSize: 18 },
  emergencyText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24,
  },
  vitalCard: {
    flex: 1, minWidth: '45%',
    backgroundColor: colors.primaryLight,
    borderRadius: 14, padding: 16,
  },
  vitalLabel: { fontSize: 12, color: colors.textMuted, marginBottom: 10 },
  vitalValue: { fontSize: 20, fontWeight: '700', color: colors.text },

  form: {
    backgroundColor: colors.white,
    borderRadius: 16, padding: 20,
  },
  formTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 4 },
  formSubtitle: { fontSize: 13, color: colors.textMuted, marginBottom: 20 },

  fieldWrapper: { marginBottom: 16 },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },

  select: {
    borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 13,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white,
  },
  selectPlaceholder: { color: '#AAAAAA', fontSize: 14 },
  selectValue: { color: colors.text, fontSize: 14, fontWeight: '600' },
  chevron: { color: colors.textMuted, fontSize: 11 },

  dropdown: {
    borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 10, marginTop: 4,
    backgroundColor: colors.white, overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  dropdownText: { fontSize: 14, color: colors.text },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 10, paddingVertical: 16,
    alignItems: 'center', marginTop: 28,
  },
  submitText: { color: colors.white, fontWeight: '700', fontSize: 15 },
});