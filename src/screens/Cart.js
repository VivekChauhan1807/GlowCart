// src/screens/Cart.js
import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleSheet as RNStyleSheet,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { useCart } from './CartContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Cart({ navigation }) {
  const {
    cartItems,
    removeFromCart,
    incrementQty,
    decrementQty,
    totalAmount,
    totalOriginal,
    totalDiscount,
    cartCount,
    getOriginal,
  } = useCart();

  // Subtle full-screen pulse for "Order Now" (per item)
  const pulse = useRef(new Animated.Value(0)).current;
  const triggerPulse = () => {
    pulse.setValue(0);
    Animated.timing(pulse, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(pulse, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  const renderItem = ({ item }) => {
    const dp = Number(item.discountPercentage || 0);
    const now = Number(item.price || 0);
    const was = getOriginal(now, dp);
    const offPct = dp > 0 ? Math.round(dp) : 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.thumbnail || item.images?.[0] }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceNow}>₹{now.toFixed(2)}</Text>
            {offPct > 0 && (
              <>
                <Text style={styles.priceWas}>₹{was.toFixed(2)}</Text>
                <Text style={styles.offTag}>{offPct}% Off</Text>
              </>
            )}
          </View>

          <View style={styles.qtyRow}>
            <Text style={styles.qtyLabel}>Quantity: {item.quantity}</Text>
            <View style={styles.stepper}>
              <TouchableOpacity
                style={[styles.stepBtn, styles.stepLeft]}
                onPress={() => decrementQty(item.id)}
                activeOpacity={0.8}
              >
                <Icon name="minus" size={18} color={COLORS.text} />
              </TouchableOpacity>
              <View style={styles.stepMid}>
                <Text style={styles.stepQty}>{item.quantity}</Text>
              </View>
              <TouchableOpacity
                style={[styles.stepBtn, styles.stepRight]}
                onPress={() => incrementQty(item.id)}
                activeOpacity={0.8}
              >
                <Icon name="plus" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeFromCart(item.id)}
              activeOpacity={0.85}
            >
              <Icon name="trash-can-outline" size={16} color={COLORS.danger} />
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.orderNowBtn}
              onPress={triggerPulse}
              activeOpacity={0.9}
            >
              <Text style={styles.orderNowText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const orderTotal = totalAmount; // after discount

  return (
    <View style={styles.container}>
      {/* Header bar (unchanged) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="chevron-left" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.heading}>MY CART</Text>

        <View style={{ width: 26 }} />
      </View>

      {/* Empty Cart UI (unchanged) */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Image source={require('../../assets/images/cart1.png')} style={styles.emptyImage} />

          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyTagline}>
            Just relax, let us help you find some first-class products
          </Text>

          <TouchableOpacity
            style={styles.shopBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListFooterComponent={
              <View style={styles.footerWrap}>
                {/* Price Details Card */}
                <View style={styles.priceCard}>
                  <Text style={styles.priceCardTitle}>Price Details ({cartCount} Items)</Text>

                  <View style={styles.priceLine} />

                  <View style={styles.rowLR}>
                    <View style={styles.leftCol}>
                      <Text style={styles.leftLabel}>Total Product Price</Text>
                      <View style={styles.leftUnderline} />
                    </View>
                    <Text style={styles.rightVal}>₹{totalOriginal.toFixed(2)}</Text>
                  </View>

                  <View style={styles.rowLR}>
                    <View style={styles.leftCol}>
                      <Text style={styles.leftLabel}>Total Discounts</Text>
                    </View>
                    <Text style={[styles.rightVal, { color: COLORS.danger }]}>
                      -₹{totalDiscount.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.dividerThin} />

                  <View style={styles.rowLR}>
                    <Text style={styles.orderTotalLabel}>Order Total</Text>
                    <Text style={styles.orderTotalVal}>₹{orderTotal.toFixed(2)}</Text>
                  </View>

                  <View style={styles.savingsRow}>
                    <Icon name="check-decagram" size={16} color={COLORS.success} />
                    <Text style={styles.savingsText}>
                      Yay! Your total discount is ₹{totalDiscount.toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Bottom Spacer for sticky bar */}
                <View style={{ height: 88 }} />
              </View>
            }
          />

          {/* Sticky bottom bar */}
          <View style={styles.stickyBar}>
            <View>
              <Text style={styles.totalSmall}>Total</Text>
              <Text style={styles.totalBig}>₹{orderTotal.toFixed(2)}</Text>
              <Text style={styles.orderNowSmall}>ORDER NOW</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.9}>
              <Text style={styles.checkoutText}>Continue</Text>
              <Icon name="chevron-double-right" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Screen pulse overlay for item "Order Now" */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#000',
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 0.08] }),
          },
        ]}
      />
    </View>
  );
}

const COLORS = {
  text: '#1C1C1E',
  sub: '#6E6E73',
  divider: '#E5E5EA',
  primary: '#cc3d3d',
  cardBg: '#fff',
  white: '#ffffff',
  success: '#0a8f3a',
  danger: '#dd2c2c',
  dark: '#2C2C2E',
  bg: '#ffeee7',
  btn: '#6C63FF',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // Header bar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: RNStyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
  },
  heading: { fontSize: 18, fontWeight: '800', color: COLORS.text, textAlign: 'center' },

  // Empty state (unchanged)
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyImage: {
    height: 250,
    resizeMode: 'contain',
    marginBottom: 16,
    marginTop: -20,
  },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  emptyTagline: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.sub,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  shopBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
    alignSelf: 'center',
  },
  shopBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  // Filled Cart - Item Card
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.cardBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 16,
    marginTop: 10,
  },
  image: { width: 64, height: 64, borderRadius: 8, marginRight: 12 },
  title: { fontSize: 14, fontWeight: '700', color: COLORS.text },

  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
  priceNow: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  priceWas: {
    fontSize: 12,
    color: COLORS.sub,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  offTag: { fontSize: 12, color: COLORS.success, fontWeight: '700' },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  qtyLabel: { fontSize: 12, color: COLORS.sub },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 36,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  stepLeft: { borderRightWidth: 1, borderRightColor: COLORS.divider },
  stepRight: { borderLeftWidth: 1, borderLeftColor: COLORS.divider },
  stepMid: {
    minWidth: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  stepQty: { fontSize: 13, fontWeight: '700', color: COLORS.text },

  actionRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  removeText: { color: COLORS.danger, fontSize: 12, fontWeight: '700' },

  orderNowBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  orderNowText: { color: '#fff', fontSize: 12, fontWeight: '800', letterSpacing: 0.2 },

  // Footer content wrapper
  footerWrap: { paddingHorizontal: 16, paddingTop: 6 },

  // Price Details Card
  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  priceCardTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  priceLine: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: 10,
    marginBottom: 6,
  },
  rowLR: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  leftCol: { flexDirection: 'column', alignItems: 'flex-start' },
  leftLabel: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  leftUnderline: {
    marginTop: 4,
    width: 120,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  rightVal: { fontSize: 13, color: COLORS.text, fontWeight: '700' },
  dividerThin: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginTop: 10,
    marginBottom: 8,
  },
  orderTotalLabel: { fontSize: 14, color: COLORS.text, fontWeight: '800' },
  orderTotalVal: { fontSize: 16, color: COLORS.text, fontWeight: '800' },
  savingsRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  savingsText: { color: COLORS.success, fontSize: 12, fontWeight: '700' },

  // Sticky bottom bar
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalSmall: { fontSize: 12, color: COLORS.sub },
  totalBig: { fontSize: 18, color: COLORS.text, fontWeight: '800', marginTop: 2 },
  orderNowSmall: { fontSize: 11, color: COLORS.success, marginTop: 2, fontWeight: '800' },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkoutText: { color: '#fff', fontSize: 13, fontWeight: '800' },
});