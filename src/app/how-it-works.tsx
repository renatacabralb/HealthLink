import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { StepCard } from '../components/StepCard';
import { colors } from '../constants/colors';

const steps = [
  {
    step: 'PASSO 01',
    icon: '📡',
    title: 'Pulseira coleta',
    description: 'Sensores medem batimentos, SpO₂, temperatura e movimentação continuamente.',
  },
  {
    step: 'PASSO 02',
    icon: '🛜',
    title: 'Transmite via LoRa/Wi-Fi',
    description: 'Envia dados mesmo em regiões com pouca infraestrutura de internet.',
  },
];

export default function HowItWorksScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>COMO FUNCIONA</Text>
        <Text style={styles.title}>
          Da pulseira ao posto de saúde, em segundos
        </Text>
        {steps.map((s) => (
          <StepCard key={s.step} {...s} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 32 },
  label: {
    fontSize: 12, fontWeight: '700',
    color: colors.primary, letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    fontSize: 28, fontWeight: '800',
    color: colors.text, lineHeight: 36,
    marginBottom: 32,
  },
});