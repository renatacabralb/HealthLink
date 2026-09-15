import React from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';

function RootNavigation() {
  const { session, role, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
  console.log('🔍 DEBUG:', { session: !!session, role, loading, segments });

  if (loading) return;

  const inAuthGroup = segments[0] === '(auth)';
  const inPatientGroup = segments[0] === '(patient)';
  const inDoctorGroup = segments[0] === '(doctor)';
  const isIndexScreen = !segments[0]; // tela inicial (landing)

  console.log('🔍 Grupos:', { inAuthGroup, inPatientGroup, inDoctorGroup, isIndexScreen });

  if (!session && !inAuthGroup && !isIndexScreen) {
    console.log('➡️ Indo pro login');
    router.replace('/login');
  } else if (session && role === 'patient' && !inPatientGroup) {
    console.log('➡️ Indo pro (patient)');
    router.replace('/(patient)');
  } else if (session && role === 'doctor' && !inDoctorGroup) {
    console.log('➡️ Indo pro (doctor)');
    router.replace('/(doctor)');
  } else {
    console.log('⏸️ Nenhuma condição bateu, não navegou');
  }
}, [session, role, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(patient)" />
      <Stack.Screen name="(doctor)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}