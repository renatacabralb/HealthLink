import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import { colors } from '../constants/colors';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Monitoramento de saúde em tempo real</Text>
        </View>

        {/* Headline */}
        <Text style={styles.title}>
          Cuidado conectado,{' '}
          <Text style={styles.titleHighlight}>onde você estiver</Text>
        </Text>

        {/* Subtext */}
        <Text style={styles.subtitle}>
          HealthLink leva monitoramento médico contínuo a comunidades rurais e regiões
          isoladas, unindo uma pulseira inteligente com a tecnologia LoRa e Wi-Fi para
          conectar pacientes e profissionais da saúde, independentemente da distância.
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/how-it-works')}
        >
          <Text style={styles.primaryButtonText}>Conhecer a solução →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/features')}
        >
          <Text style={styles.secondaryButtonText}>Ver demonstração</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 24,
    paddingTop: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  badgeText: { color: colors.primary, fontSize: 12, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: '800', color: colors.text, lineHeight: 40, marginBottom: 16 },
  titleHighlight: { color: colors.primary },
  subtitle: { fontSize: 15, color: colors.textMuted, lineHeight: 24, marginBottom: 32 },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  secondaryButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.cardBg,
  },
  secondaryButtonText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
});