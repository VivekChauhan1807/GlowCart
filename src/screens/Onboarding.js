// src/screens/Onboarding.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width: W, height: H } = Dimensions.get('window');

// Figma base frame (iPhone 14 Pro-ish): 430 × 932
const BASE_W = 430;
const BASE_H = 932;
const sx = W / BASE_W;
// Prefer width-based scaling to keep visuals consistent across aspect ratios
const sy = sx;

// Design tokens
const COLORS = {
  bg: '#c9a7a2',
  brand: '#b84953',
  progressLeft: '#f3e2dd',
  progressRight: '#d5c0ba',
  text: '#3a3131',
  sub: '#7b6f6f',
  white: '#FFFFFF',
};

// Hero metrics from Figma
const HERO_H = 695 * sy;
const RADIUS = 42 * sx;

// Brand overlay from Figma
const BRAND_TOP = 644 * sy;
const BRAND_LEFT = 140 * sx;
const BRAND_W = 151 * sx;
const BRAND_H = 21 * sy;

// Tagline from Figma (sits right below hero)
const TAGLINE_TOP = 695 * sy;

// Button from Figma
const BTN_W = 195 * sx;
const BTN_H = 56 * sy;
const BTN_RADIUS = 16 * sx;

// Progress bar from Figma
const PROG_W = 172 * sx;
const PROG_H = 11 * sy;
const PROG_RADIUS = 24 * sx;

export default function Onboarding({ navigation }) {
  return (
    <SafeAreaView style={s.safe}>
      {/* Hero image with rounded bottom corners */}
      <View style={s.heroWrap}>
        <Image
          source={require('../../assets/images/onboarding.png')} // 860×1390
          style={s.heroImg}
          resizeMode="cover"
        />

        {/* Brand over the image (exact absolute mapping) */}
        <View style={s.brandBox}>
          <Text style={s.brand}>Viorra</Text>
        </View>
      </View>

      {/* Tagline tightly under the hero */}
      <View style={s.textBlock}>
        <Text style={s.headline}>Your Beauty, Delivered</Text>
      </View>

      {/* CTA */}
      <View style={s.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={s.button}
          onPress={() => navigation?.navigate?.('Login')}
        >
          <Text style={s.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Progress bar with 40% + 60% fill */}
        <View style={s.progressTrack}>
          <View style={s.progressLeft} />
          <View style={s.progressRight} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  heroWrap: {
    width: '100%',
    height: HERO_H,
    overflow: 'hidden',
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  brandBox: {
    position: 'absolute',
    top: 510,
    left: BRAND_LEFT,
    width: BRAND_W,
    // height: BRAND_H,
    alignItems: 'center',
    justifyContent: 'center',
    // Ensure text sits on top of image
    zIndex: 2,
  },
  brand: {
    // Italiana (custom font; see font setup below)
    fontFamily: 'Italiana-Regular',
    fontSize: 56 * sy, // matches Figma height 21
    color: COLORS.white,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textBlock: {
    paddingTop: Math.max(0, (TAGLINE_TOP - HERO_H)), // aligns right under hero
    // paddingHorizontal: 24,
    alignItems: 'center',
  },
  headline: {
    // Playfair Display light/thin look
    fontFamily: 'Inter-Regular',
    fontSize: 26 * sx,
    color: COLORS.white,
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  button: {
    width: BTN_W,
    height: BTN_H,
    borderRadius: BTN_RADIUS,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    // Inter for UI labels
    fontFamily: 'Inter-Medium',
    fontSize: 25 * sx,
    color: COLORS.white,
  },
  progressTrack: {
    marginTop: 20 * sy,
    width: PROG_W,
    height: PROG_H,
    borderRadius: PROG_RADIUS,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressLeft: {
    width: '40%',
    height: '100%',
    backgroundColor: COLORS.progressLeft,
  },
  progressRight: {
    width: '60%',
    height: '100%',
    backgroundColor: COLORS.progressRight,
  },
});