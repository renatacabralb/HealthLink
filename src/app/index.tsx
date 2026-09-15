import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Ilustração no topo — ocupa boa parte da tela */}
      <View style={styles.illustrationArea}>
        <View style={styles.circleOuter}>
          <View style={styles.circleInner}>
            <Text style={styles.illustrationIcon}>💙</Text>
          </View>
        </View>
        <View style={styles.dot1} />
        <View style={styles.dot2} />
      </View>

      {/* Bloco de texto compacto */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>
          Cuidado conectado,{'\n'}
          <Text style={styles.titleHighlight}>onde você estiver</Text>
        </Text>

        <Text style={styles.subtitle}>
          Monitoramento médico contínuo para comunidades rurais e regiões isoladas,
          via pulseira inteligente com LoRa e Wi-Fi.
        </Text>
      </View>

      {/* Botões fixos embaixo */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.primaryButtonText}>Conhecer a solução</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
         onPress={() => router.push('/login')}
        >
          <Text style={styles.secondaryButtonText}>Ver demonstração</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  illustrationArea: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationIcon: { fontSize: 48 },
  dot1: {
    position: 'absolute',
    top: '20%',
    right: '15%',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primaryLight,
  },
  dot2: {
    position: 'absolute',
    bottom: '15%',
    left: '12%',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  textBlock: {
    flex: 0.9,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 32,
    marginBottom: 12,
  },
  titleHighlight: { color: colors.primary },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 21,
  },
  actions: {
    paddingBottom: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: colors.cardBg,
  },
  secondaryButtonText: { color: colors.primary, fontWeight: '600', fontSize: 15 },
});