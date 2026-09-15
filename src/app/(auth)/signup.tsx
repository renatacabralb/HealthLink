import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { colors } from '../../constants/colors';

type Role = 'patient' | 'doctor';

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('patient');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName, role);
    setLoading(false);
    if (error) {
      Alert.alert('Erro ao cadastrar', error);
      return;
    }
    Alert.alert(
      'Conta criada!',
      'Verifique seu email para confirmar o cadastro (se a confirmação estiver ativada no Supabase).',
      [{ text: 'OK', onPress: () => router.push('/login') }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Comece seu acompanhamento agora</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Eu sou</Text>
            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={[styles.roleOption, role === 'patient' && styles.roleOptionActive]}
                onPress={() => setRole('patient')}
              >
                <Text style={[styles.roleText, role === 'patient' && styles.roleTextActive]}>
                  Paciente
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleOption, role === 'doctor' && styles.roleOptionActive]}
                onPress={() => setRole('doctor')}
              >
                <Text style={[styles.roleText, role === 'doctor' && styles.roleTextActive]}>
                  Médico
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor={colors.textMuted}
              value={fullName}
              onChangeText={setFullName}
            />

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
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.linkText}>
                Já tem conta? <Text style={styles.linkHighlight}>Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24 },
  header: { marginTop: 30, marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: colors.textMuted },
  form: { flex: 1, paddingBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6, marginTop: 16 },
  input: {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
  },
  roleSelector: { flexDirection: 'row', gap: 10 },
  roleOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  roleOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  roleText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  roleTextActive: { color: colors.primary },
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