// src/screens/ProductDetails.js
import React, { useEffect, useMemo, useState, useRef } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCart } from './CartContext'

const { width } = Dimensions.get('window')

const COLORS = {
  bg: '#FFEDE8',
  tint: '#FFF7F8',
  text: '#1C1C1E',
  sub: '#6E6E73',
  border: '#E5E5EA',
  primary: '#B84953',
  star: '#FFA800',
}

export default function ProductDetails({ route, navigation }) {
  const passed = route?.params?.product || {}
  const [data, setData] = useState(passed)
  const [qty, setQty] = useState(1)

  // cart APIs
  const { addToCart, cartCount } = useCart()

  // show "Go To Cart" only immediately after add
  const [showGoToCart, setShowGoToCart] = useState(false)

  // toast animation state (right -> left)
  const toastX = useRef(new Animated.Value(width)).current

  useEffect(() => {
    let mounted = true
    if (passed.id) {
      fetch(`https://dummyjson.com/products/${passed.id}`)
        .then((res) => res.json())
        .then((json) => mounted && setData(json))
        .catch(() => {})
    }
    return () => (mounted = false)
  }, [passed.id])

  // reset CTA text on refocus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowGoToCart(false)
    })
    return unsubscribe
  }, [navigation])

  const p = data || passed
  const title = p.title || 'Product Name'
  const desc =
    p.description ||
    'Lightweight, hydrating formula that delivers a natural, dewy glow.'
  const price = p.price ?? 9.99
  const dp = p.discountPercentage ?? 0
  const original = dp ? +(price / (1 - dp / 100)).toFixed(2) : price
  const rating = p.rating ?? 4.8

  const stars = useMemo(() => {
    const full = Math.floor(rating)
    const frac = rating - full
    let arr = []
    for (let i = 0; i < full; i++) arr.push('star')
    if (arr.length < 5) {
      if (frac >= 0.75) arr.push('star')
      else if (frac >= 0.25) arr.push('star-half-full')
      else arr.push('star-outline')
    }
    while (arr.length < 5) arr.push('star-outline')
    return arr
  }, [rating])

  const dims = p.dimensions || {}
  const widthVal = dims.width ?? 15.14
  const heightVal = dims.height ?? 13.08
  const warranty = p.warrantyInformation ?? '1 week'
  const shipping = p.shippingInformation ?? 'In 3–5 business days'
  const total = (price * qty).toFixed(2)

  // slide-in toast above CTA bar
  const showToast = () => {
    Animated.timing(toastX, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastX, {
          toValue: width,
          duration: 280,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }).start()
      }, 1600)
    })
  }

  const handlePrimaryPress = () => {
    if (showGoToCart) {
      navigation.navigate('Cart')
      return
    }
    addToCart(p)
    setShowGoToCart(true)
    showToast()
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scrollContent}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.iconBtn}>
            <Icon name="chevron-left" size={26} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={s.iconBtn}>
            <Icon name="cart-outline" size={22} color={COLORS.text} />
            {cartCount > 0 && (
              <View style={s.badge}>
                <Text style={s.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={s.imageWrap}>
          <Image
            source={
              p.images?.[0]
                ? { uri: p.images[0] }
                : require('../../assets/images/p1.png')
            }
            style={s.image}
          />
        </View>

        <View style={s.actionRow}>
          <TouchableOpacity onPress={() => Alert.alert('View Similar')} style={s.hollowBtn}>
            <Icon name="image-multiple-outline" size={16} color={COLORS.primary} />
            <Text style={s.hollowText}>View Similar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Share')} style={s.circleBtn}>
            <Icon name="share-variant" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.desc}>{desc}</Text>
          <View style={s.ratingRow}>
            <View style={s.starsRow}>
              {stars.map((n, i) => (
                <Icon key={i} name={n} size={16} color={COLORS.star} />
              ))}
            </View>
            <Text style={s.ratingNum}>{rating.toFixed(1)}/5</Text>
          </View>
        </View>

        <View style={s.hr} />

        <View style={s.section}>
          <Text style={s.soldBy}>
            <Text style={s.label}>Sold by :</Text> {p.brand ?? 'Essence'}
          </Text>
        </View>

        <View style={[s.section, s.priceRow]}>
          <View style={s.prices}>
            <Text style={s.priceNow}>₹{price.toFixed(2)}</Text>
            {dp > 0 && <Text style={s.priceWas}>₹{original.toFixed(2)}</Text>}
          </View>

          <TouchableOpacity style={s.addBtn} onPress={handlePrimaryPress}>
            <Icon name={showGoToCart ? 'cart-arrow-right' : 'cart'} size={20} color="#FFF" />
            <Text style={s.addBtnText}>{showGoToCart ? 'Go To Cart' : 'Add to Cart'}</Text>
          </TouchableOpacity>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Highlights</Text>
          <View style={s.gridRow}>
            <View style={s.col}>
              <View style={s.cell}>
                <Text style={s.cellKey}>Width</Text>
                <Text style={s.cellVal}>{widthVal}</Text>
              </View>
              <View style={s.cell}>
                <Text style={s.cellKey}>Height</Text>
                <Text style={s.cellVal}>{heightVal}</Text>
              </View>
            </View>
            <View style={s.vDivider} />
            <View style={s.col}>
              <View style={s.cell}>
                <Text style={s.cellKey}>Warranty</Text>
                <Text style={s.cellVal}>{warranty}</Text>
              </View>
              <View style={s.cell}>
                <Text style={s.cellKey}>Shipping</Text>
                <Text style={s.cellVal}>{shipping}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Ratings & Reviews</Text>
          {(p.reviews || []).slice(0, 3).map((r, i) => (
            <View key={i} style={s.reviewCard}>
              <View style={s.reviewTop}>
                <Image source={require('../../assets/images/review.png')} style={s.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={s.reviewerName}>{r.reviewerName}</Text>
                  <Text style={s.reviewerEmail}>{r.reviewerEmail}</Text>
                </View>
                <View style={s.reviewStars}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Icon
                      key={idx}
                      name={idx < r.rating ? 'star' : 'star-outline'}
                      size={14}
                      color={COLORS.star}
                    />
                  ))}
                </View>
              </View>
              <Text style={s.reviewText}>{r.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CTA Bar (unchanged) */}
      <View style={s.ctaBar}>
        <View>
          <Text style={s.label}>Total</Text>
          <Text style={s.total}>₹{total}</Text>
        </View>
        <TouchableOpacity style={s.primaryBtn}>
          <Text style={s.primaryText}>Purchase Now</Text>
        </TouchableOpacity>
      </View>

      {/* Minimal slide-in toast above CTA bar (only icon + text) */}
      <Animated.View
        pointerEvents="none"
        style={[
          s.toast,
          { transform: [{ translateX: toastX }] }
        ]}
      >
        <Icon name="check-circle-outline" size={20} color={COLORS.primary} />
        <Text style={s.toastText}>Product is added to cart.</Text>
      </Animated.View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  // keep content visible above CTA bar
  scrollContent: { paddingBottom: 100 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    height: 48,
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  // cart badge on header icon
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },

  imageWrap: {
    height: 320,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: COLORS.tint,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  hollowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 10,
  },
  hollowText: { marginLeft: 6, color: COLORS.primary, fontWeight: '700' },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffede8',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  section: { marginTop: 16, paddingHorizontal: 16 },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  desc: { marginTop: 6, fontSize: 14, lineHeight: 20, color: COLORS.sub },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  starsRow: { flexDirection: 'row' },
  ratingNum: { marginLeft: 8, fontSize: 14, color: COLORS.sub },

  hr: { height: 1, backgroundColor: COLORS.border, marginTop: 16, marginHorizontal: 16 },

  soldBy: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  label: { fontSize: 13, color: COLORS.sub },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prices: { flexDirection: 'row', alignItems: 'flex-end' },
  priceNow: { fontSize: 22, fontWeight: '800', color: COLORS.primary },
  priceWas: {
    fontSize: 14,
    color: COLORS.sub,
    textDecorationLine: 'line-through',
    marginLeft: 12,
    marginBottom: 2,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700', marginLeft: 8 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 10 },

  gridRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  col: { flex: 1 },
  vDivider: { width: 1, backgroundColor: COLORS.border },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cellKey: { fontSize: 12, color: COLORS.sub },
  cellVal: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginTop: 4 },

  reviewCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: '#FFF',
    padding: 12,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  reviewerName: { marginLeft: 8, fontSize: 14, fontWeight: '700', color: COLORS.text },
  reviewerEmail: { marginLeft: 8, fontSize: 12, color: COLORS.sub, marginTop: 2 },
  reviewStars: { flexDirection: 'row', marginLeft: 12 },
  reviewText: { marginTop: 8, fontSize: 13, lineHeight: 20, color: COLORS.text },

  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  total: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
  },
  primaryText: { color: '#FFF', fontSize: 15, fontWeight: '700', marginLeft: 8 },

  // toast above CTA bar
  toast:{
    position:'absolute', bottom:86, left:16, right:16, backgroundColor:'#FFF',
    borderWidth:1, borderColor:'#DDD', borderRadius:8, padding:14,
    flexDirection:'row', alignItems:'center'
  },
  toastText:{ marginLeft:8, fontSize:14, fontFamily:'Inter-Medium' }
})