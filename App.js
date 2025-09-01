// App.js
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import Onboarding from './src/screens/Onboarding'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import ProductList from './src/screens/ProductList'
import ProductDetails from './src/screens/ProductDetails'
import Profile from './src/screens/Profile'
// ✅ Import CartProvider
import Cart from './src/screens/Cart';
import { CartProvider } from './src/screens/CartContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  )
}