import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import { StepCard } from '../components/StepCard';
import { FeatureCard } from '../components/FeatureCard';
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
  {
    step: 'PASSO 03',
    icon: '📱',
    title: 'Dados enviados para o App',
    description: 'As informações coletadas são exibidas em tempo real no aplicativo para monitoramento e análise.',
  },
];

const features = [
  {
    icon: '❤️',
    title: 'Frequência cardíaca',
    description: 'Monitoramento contínuo dos batimentos com detecção de anomalias.',
  },
  {
    icon: '💧',
    title: 'Oxigenação',
    description: 'Leitura precisa do nível de oxigênio no sangue 24/7.',
  },
  {
    icon: '🌡️',
    title: 'Temperatura corporal',
    description: 'Acompanhamento de variações que indicam alertas precoces.',
  },
];

export default function HowItWorksScreen() {
  const router = useRouter();

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

        <Text style={[styles.label, styles.sectionSpacing]}>O QUE MONITORAMOS</Text>
        <Text style={styles.title}>
          Tudo que importa para a saúde, em um só lugar
        </Text>
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}

        {/* Botão Começar agora */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/patient' as any)}
        >
          <Text style={styles.primaryButtonText}>Começar agora →</Text>
        </TouchableOpacity>

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
  sectionSpacing: { marginTop: 40 },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});