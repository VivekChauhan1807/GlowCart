import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  bg: '#FFEDE8',          // light pink background
  card: '#FFFFFF',        // cards
  primary: '#B84953',     // brand red (icons, active, accents)
  text: '#070707',        // primary text
  sub: '#7D7D7D',         // secondary text
  border: '#E5E5EA',      // borders
  chevron: '#636363',     // chevron grey
  white: '#FFFFFF',
};

export default function Profile({ navigation }) {
  const [activeTab, setActiveTab] = useState('Profile');

  const goTab = (tab) => {
    setActiveTab(tab);
    // Wire these to your actual routes if available
    if (tab === 'Home') navigation?.navigate('ProductList');
    if (tab === 'Offers') navigation?.navigate('ProductList');
    if (tab === 'Wishlist') navigation?.navigate('ProductList');
    if (tab === 'Profile') {} // already here
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Profile</Text>
        <TouchableOpacity activeOpacity={0.8} style={s.headerAction}>
          <Icon name="dots-horizontal" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile summary card */}
        <View style={[s.card, s.shadow, s.card2]}>
          <View style={s.leftGroup}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={s.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={s.name}>Olivia</Text>
              <Text style={s.email}>Oliva@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Icon name="pencil-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Settings group 1 */}
        <View style={[s.card, s.shadow, { paddingVertical: 4 }]}>
          <SettingRow
            icon="map-marker-outline"
            title="Address"
            subtitle="Manage your saved address"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="history"
            title="Order History"
            subtitle="View your past orders"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="translate"
            title="Language"
            subtitle="Change app language"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="bell-outline"
            title="Notifications"
            subtitle="Manage push alerts"
            onPress={() => {}}
          />
        </View>

        {/* Settings group 2 */}
        <View style={[s.card, s.shadow, { paddingVertical: 4 }]}>
          <SettingRow
            icon="headset"
            title="Contact Us"
            subtitle="Reach our support team"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="help-circle-outline"
            title="Get Help"
            subtitle="FAQs and guides"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="shield-lock-outline"
            title="Privacy Policy"
            subtitle="How we handle data"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="file-document-outline"
            title="Terms and Conditions"
            subtitle="Legal information"
            onPress={() => {}}
          />
        </View>

        {/* Logout separate red row at bottom */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={s.logoutRow}
          onPress={() => navigation.navigate('Login')}
        >
          <Icon name="logout" size={20} color={COLORS.primary} />
          <Text style={s.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom navigation */}
      <View style={s.tabBar}>
        <TabItem
          label="Home"
          iconActive="home"
          iconInactive="home-outline"
          active={activeTab === 'Home'}
          onPress={() => goTab('Home')}
        />
        <TabItem
          label="Offers"
          iconActive="sale"
          iconInactive="sale"
          active={activeTab === 'Offers'}
          onPress={() => goTab('Offers')}
        />
        <TabItem
          label="Wishlist"
          iconActive="heart"
          iconInactive="heart-outline"
          active={activeTab === 'Wishlist'}
          onPress={() => goTab('Wishlist')}
        />
        <TabItem
          label="Profile"
          iconActive="account"
          iconInactive="account-outline"
          active={activeTab === 'Profile'}
          onPress={() => goTab('Profile')}
        />
      </View>
    </SafeAreaView>
  );
}

/* Rows, dividers, and tabs */

function SettingRow({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={row.row}>
      <View style={row.leftWrap}>
        <View style={row.iconWrap}>
          <Icon name={icon} size={20} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={row.title}>{title}</Text>
          {!!subtitle && <Text style={row.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Icon name="chevron-right" size={22} color={COLORS.chevron} />
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={row.divider} />;
}

function TabItem({ label, iconActive, iconInactive, active, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={tab.item}>
      <Icon
        name={active ? iconActive : iconInactive}
        size={22}
        color={active ? COLORS.primary : COLORS.sub}
      />
      <Text style={[tab.label, active && { color: COLORS.primary, fontFamily:'Inter-Medium' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Styles */

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily:'Inter-SemiBold',
    color: COLORS.text,
  },
  headerAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowStyle(6),
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100, // space for tab bar
  },
  card: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between', // left group left me, pencil right me
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
  },
  card2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // left group left me, pencil right me
    paddingRight: 45,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: COLORS.text,
  },
  email: {
    marginTop: 4,
    color: COLORS.sub,
    fontSize: 13,
  },
  logoutRow: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    justifyContent: 'center',
    marginTop: 4,
    ...shadowStyle(4),
  },
  logoutText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: COLORS.primary,
  },
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
  shadow: {
    ...shadowStyle(6),
  },
});

const row = StyleSheet.create({
  row: {
    minHeight: 64,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF7F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontFamily:'Inter-Medium',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.sub,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginLeft: 52, // align under text, not icon
  },
});

const tab = StyleSheet.create({
  item: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    color: COLORS.sub,
  },
});

/* Cross-platform shadow helper */
function shadowStyle(elevation = 6) {
  if (Platform.OS === 'android') return { elevation };
  // iOS shadow
  return {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: elevation,
    shadowOffset: { width: 0, height: Math.ceil(elevation / 2) },
  };
}