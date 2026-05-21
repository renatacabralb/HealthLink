import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <View style={styles.logoIcon} />
        <Text style={styles.logoText}>HealthLink</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Começar agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: {
    width: 28, height: 28,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  logoText: { fontSize: 16, fontWeight: '700', color: colors.text },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: colors.white, fontSize: 13, fontWeight: '600' },
});