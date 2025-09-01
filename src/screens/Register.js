import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  background: '#FFF2F4',
  primary: '#B84953',
  text: '#1C1C1E',
  placeholder: '#8E8E93',
  border: '#E5E5EA',
};

export default function Register({ navigation }) {
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Top Banner */}
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Join The Glow!</Text>
          </View>

          {/* Full Name (no right icon) */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
            />
          </View>

          {/* Email Address */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <Icon
              name="email-outline"
              size={20}
              color={COLORS.placeholder}
              style={styles.iconRight}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={securePass}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setSecurePass(!securePass)}>
              <Icon
                name={securePass ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.placeholder}
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry={secureConfirm}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
              <Icon
                name={secureConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.placeholder}
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already a Member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
  },
  headerBox: {
    backgroundColor: '#F1B0B0',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: 52,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal:-28,
  },
  headerText: {
    fontSize: 26,
    fontFamily:'PlayfairDisplay-Regular',
    color: COLORS.primary,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#767676',
    borderRadius: 12,
    height: 52,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingLeft: 4, // creates "left empty space" feel
  },
  iconRight: {
    marginLeft: 8,
  },
  button: {
    marginTop: 32,
    height: 52,
    borderRadius: 14, // adjusted per Figma
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily:'Inter-Medium'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 150,
  },
  footerText: {
    fontSize: 13,
    color: '#6C6C6C',
  },
  footerLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontFamily:'Inter-Bold'
  },
});