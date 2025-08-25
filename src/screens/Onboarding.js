// src/screens/Onboarding.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Onboarding({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        {/* If you have a logo file: replace require path accordingly */}
        {/* <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" /> */}
        <Text style={styles.logoText}>GlowCart</Text>
      </View>

      <View style={styles.center}>
        <Text style={styles.title}>Your Beauty, Delivered</Text>
        <Text style={styles.subtitle}>
          Shop trusted cosmetics, skincare and haircare — fast delivery to your door.
        </Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation?.navigate?.('Login') } // navigation will be wired next
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
  top: { alignItems: 'center', paddingTop: 40 },
  logo: { width: 140, height: 140 },
  logoText: { fontSize: 28, fontWeight: '700', color: '#FF6B81' },
  center: { alignItems: 'center', paddingHorizontal: 30 },
  title: { fontSize: 28, fontWeight: '700', marginTop: 10, color: '#222' },
  subtitle: { marginTop: 12, fontSize: 15, textAlign: 'center', color: '#666' },
  bottom: { padding: 24 },
  button: {
    backgroundColor: '#FF6B81',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});