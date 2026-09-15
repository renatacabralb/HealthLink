import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    console.log('🔑 Resultado do login:', { error });
    if (error) {
      Alert.alert('Erro ao entrar', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Entre para continuar seu acompanhamento</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.linkText}>
              Não tem conta? <Text style={styles.linkHighlight}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24 },
  header: { marginTop: 40, marginBottom: 32 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.textMuted },
  form: { flex: 1 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 28,
  },
  primaryButtonText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  linkButton: { alignItems: 'center', marginTop: 20 },
  linkText: { color: colors.textMuted, fontSize: 14 },
  linkHighlight: { color: colors.primary, fontWeight: '700' },
});