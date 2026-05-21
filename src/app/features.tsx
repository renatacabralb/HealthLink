import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { FeatureCard } from '../components/FeatureCard';
import { colors } from '../constants/colors';

const features = [
  { icon: '❤️', title: 'Frequência cardíaca', description: 'Monitoramento contínuo dos batimentos com detecção de anomalias.' },
  { icon: '🫁', title: 'Oxigenação', description: 'Leitura precisa do nível de oxigênio no sangue 24/7.' },
  { icon: '🌡️', title: 'Temperatura corporal', description: 'Acompanhamento de variações que indicam alertas precoces.' },
  { icon: '💬', title: 'Telemedicina', description: 'Consultas remotas e acompanhamento médico à distância.' },
];

export default function FeaturesScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tudo que importa para a saúde, em um só lugar</Text>
        <Text style={styles.subtitle}>
          Pulseira inteligente e plataforma integrada para acompanhar pacientes em tempo
          real, mesmo em regiões com infraestrutura limitada.
        </Text>
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 32 },
  title: {
    fontSize: 28, fontWeight: '800',
    color: colors.text, lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14, color: colors.textMuted,
    lineHeight: 22, marginBottom: 28,
  },
});