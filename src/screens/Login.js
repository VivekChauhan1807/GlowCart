import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login({ navigation }) {
  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={s.container}>
      {/* Top Greeting Banner */}
      <View style={s.banner}>
        <Text style={s.bannerTitle}>Hello Again!</Text>
        <Text style={s.bannerSubtitle}>
          Welcome back you've been missed.
        </Text>
      </View>

      {/* Form */}
      <View style={s.body}>
        {/* Email Field */}
        <View style={s.field}>
          <Icon name="email-outline" size={22} style={s.leftIcon} />
          <TextInput
            placeholder="Enter your email Id"
            placeholderTextColor="#9E9E9E"
            keyboardType="email-address"
            autoCapitalize="none"
            style={s.input}
          />
        </View>

        {/* Password Field */}
        <View style={s.field}>
          <Icon name="lock-outline" size={22} style={s.leftIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9E9E9E"
            secureTextEntry={secure}
            style={s.input}
          />
          <TouchableOpacity
            onPress={() => setSecure(v => !v)}
            style={s.rightIconBtn}
          >
            <Icon
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#9E9E9E"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => {}} style={s.forgotBtn}>
          <Text style={s.forgotText}>Forgot password</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={s.primaryBtn}
          onPress={() => navigation.navigate('ProductList')}
        >
          <Text style={s.primaryText}>Log In</Text>
        </TouchableOpacity>

        {/* Or Continue With */}
        <View style={s.orRow}>
          <View style={s.line} />
          <Text style={s.orText}>Or Continue With</Text>
          <View style={s.line} />
        </View>

        {/* Social Icons */}
        <View style={s.socialRow}>
          <TouchableOpacity style={s.socialBtn}>
            <Image
              source={require('../../assets/icons/google.png')}
              style={s.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={s.socialBtn}>
            <Image
              source={require('../../assets/icons/apple.png')}
              style={s.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={s.socialBtn}>
            <Image
              source={require('../../assets/icons/facebook.png')}
              style={s.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Register Prompt */}
        <View style={s.bottomRow}>
          <Text style={s.small}>Not a Member? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={s.link}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = '#F1B0B0';
// const FONT_FAMILY = 'Inter-Regular';

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFEDE8' },

  banner: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bannerTitle: {
    fontStyle:'bold',
    fontSize: 34,
    color: '#B84953',
    fontFamily: 'PlayfairDisplay-Regular',
    textAlign: 'center',
  },
  bannerSubtitle: {
    marginTop: 4,
    fontSize: 26,
    color: '#AD7373',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },

  body: { paddingHorizontal: 24, paddingTop: 28, flex: 1 },

  field: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#989696',
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: 48,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 16,
    color: '#767676',
    fontFamily: 'Inter-Regular'
  },
  leftIcon: { position: 'absolute', left: 14, color: '#9E9E9E' },
  rightIconBtn: { position: 'absolute', right: 12, padding: 8 },

  forgotBtn: { alignSelf: 'flex-end', marginTop: 10 },
  forgotText: {
    color: '#CC3D3D',
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'underline'
  },

  primaryBtn: {
    marginTop: 20,
    backgroundColor: '#B84953',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold'
  },

  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28
  },
  line: { flex: 1, height: 1, backgroundColor: '#6C6C6C' },
  orText: {
    marginHorizontal: 12,
    color: '#6C6C6C',
    fontSize: 14,
    fontFamily: 'Inter-Regular'
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 28
  },
  socialBtn: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    padding: 10,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 10
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:50,
  },
  small: { color: '#6C6C6C',fontFamily: 'Inter-Regular' },
  link: { color: '#B84953', fontWeight: 700, fontFamily: 'Inter-Regular' }
});