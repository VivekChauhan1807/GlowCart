// src/screens/ProductList.js

import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCart } from './CartContext'

const COLORS = {
  bg: '#FFEDE8',
  card: '#FFFFFF',
  primary: '#CC3D3D',
  text: '#000000',
  sub: '#4B4B4B',
  border: '#E5E5EA',
  tint: '#FFF7F8',
}

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([])
  const { cartCount } = useCart()

  useEffect(() => {
    // fetch all products, shuffle, then take 20
    fetch('https://dummyjson.com/products/')
      .then(res => res.json())
      .then(json => {
        const all = json.products || []
        const shuffled = all.sort(() => Math.random() - 0.5)
        setProducts(shuffled.slice(0, 30))
      })
      .catch(console.error)
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={card.wrap}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={card.imageWell}>
        <Image
          source={{ uri: item.images?.[0] || item.thumbnail }}
          style={card.image}
          resizeMode="cover"
        />
      </View>

      <Text numberOfLines={1} style={card.title}>
        {item.title}
      </Text>

      <View style={card.row}>
        <Text style={card.price}>₹{item.price.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => {}}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="heart-outline" size={20} color={COLORS.sub} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={s.container}>
      <View style={s.headerBlock}>
        <View style={s.topRow}>
          <Text style={s.brand}>Viorra</Text>
          <View style={s.actions}>
            <TouchableOpacity style={s.iconBtn}>
              <Icon name="bell-outline" size={22} color={COLORS.text} />
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
        </View>

        <View style={s.searchBar}>
          <Icon name="magnify" size={20} color={COLORS.sub} />
          <TextInput
            placeholder="Search For All The Products"
            placeholderTextColor={COLORS.sub}
            style={s.searchInput}
          />
        </View>
      </View>

      <View style={s.main}>
        <View style={s.sectionHead}>
          <View>
            <Text style={s.sectionTitle}>Best Products</Text>
            <Text style={s.sectionSub}>{products.length} products</Text>
          </View>
          <TouchableOpacity style={s.filterBtn}>
            <Text style={s.filterText}>Apply Filter</Text>
            <Icon name="tune-variant" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={s.column}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={s.tabWrap}>
        <View style={s.tabBar}>
          <TabItem
            label="Home"
            iconActive="home"
            iconInactive="home-outline"
            active
            onPress={() => {}}
          />
          <TabItem
            label="Offers"
            iconActive="sale"
            iconInactive="sale"
            onPress={() => {}}
          />
          <TabItem
            label="Wishlist"
            iconActive="heart"
            iconInactive="heart-outline"
            onPress={() => {}}
          />
          <TabItem
            label="Profile"
            iconActive="account"
            iconInactive="account-outline"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

function TabItem({ label, iconActive, iconInactive, active, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={tab.item}
    >
      <Icon
        name={active ? iconActive : iconInactive}
        size={22}
        color={active ? COLORS.primary : COLORS.sub}
      />
      <Text
        style={[tab.label, active && { color: COLORS.primary, fontFamily:'Inter-Medium' }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  headerBlock: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    ...shadow(6),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  brand: { fontSize: 24, fontFamily: 'Italiana-Regular', color: COLORS.primary },
  actions: { flexDirection: 'row', gap: 12 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ✅ Badge on cart icon
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
  searchBar: {
    height: 48,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },

  main: { flex: 1, paddingTop: 14 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter-SemiBold', color: COLORS.text },
  sectionSub: { fontSize: 12, color: COLORS.sub, marginTop: 2 },
  filterBtn: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  filterText: { color: COLORS.primary, fontSize: 13, fontFamily: 'Inter-Medium' },
  listContent: { paddingBottom: 110, paddingTop: 4, rowGap: 12 },
  column: { gap: 12, paddingHorizontal: 16 },

  tabWrap: { backgroundColor: 'transparent' },
  tabBar: {
    height: 72,
    backgroundColor: COLORS.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
  },
})

const card = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 10,
  },
  imageWell: {
    height: 120,
    borderRadius: 12,
    backgroundColor: COLORS.tint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontFamily:'Inter-Medium',
    color: COLORS.text,
  },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontFamily:'Inter-Medium',
    color: COLORS.primary,
  },
})

function shadow(e = 6) {
  if (Platform.OS === 'android') return { elevation: e }
  return {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: e,
    shadowOffset: { width: 0, height: Math.ceil(e / 2) },
  }
}

const tab = StyleSheet.create({
  item: { flex: 1, height: 64, alignItems: 'center', justifyContent: 'center', gap: 2 },
  label: { fontSize: 11, color: COLORS.sub },
})