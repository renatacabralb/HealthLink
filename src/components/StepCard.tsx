import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

type Props = {
  step: string;
  icon: string;
  title: string;
  description: string;
};

export function StepCard({ step, icon, title, description }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepText}>{step}</Text>
      </View>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  stepBadge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  stepText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  icon: { fontSize: 28, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 6 },
  description: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
});