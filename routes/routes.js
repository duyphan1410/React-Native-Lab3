import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites';
import User from '../screens/User';
import Options from '../screens/Options';
import colors from '../utils/colors';

// Icons for Tab Navigator
const getTabBarIcon = icon => ({ color }) => (
  <FontAwesome name={icon} size={26} color={color} />
);

// Icons for Drawer Navigator
const getDrawerItemIcon = icon => ({ color }) => (
  <FontAwesome name={icon} size={22} color={color} />
);

// Stack Navigators
const Stack = createStackNavigator();

// Contacts Stack Navigator
const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name='Contacts' 
        component={Contacts}
        options={{ title: "Contacts" }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue,
            }
          };
        }}
      />
    </Stack.Navigator>
  );
};

// Favorites Stack Navigator
const FavoritesScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name='Favorites' 
        component={Favorites}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue,
            }
          };
        }}
      />
    </Stack.Navigator>
  );
};

// User Stack Navigator
const UserScreens = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name='User' 
        component={User}
        options={{
          headerTitle: "Me",
          headerRight: () => (
            <FontAwesome
              name="gear"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('Options')}
            />
          ),
        }}
      />
      <Stack.Screen 
        name='Options' 
        component={Options}
        options={{ title: "Options" }}
      />
    </Stack.Navigator>
  );
};

// Tab Navigator
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      barStyle={{ backgroundColor: colors.blue }}
      labeled={false}
      activeColor={colors.white}
      inactiveColor={colors.greyDark}
    >
      <Tab.Screen 
        name="ContactsScreens" 
        component={ContactsScreens}
        options={{
          tabBarIcon: getTabBarIcon('list'),
        }}
      />
      <Tab.Screen 
        name="FavoritesScreens" 
        component={FavoritesScreens}
        options={{
          tabBarIcon: getTabBarIcon('star'),
        }}
      />
      <Tab.Screen 
        name="UserScreens" 
        component={UserScreens}
        options={{
          tabBarIcon: getTabBarIcon('user'),
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        drawerActiveTintColor: colors.blue,
        drawerInactiveTintColor: colors.greyDark,
      }}
    >
      <Drawer.Screen 
        name="ContactsTab" 
        component={ContactsScreens}
        options={{
          title: "Contacts",
          drawerIcon: getDrawerItemIcon('list'),
        }}
      />
      <Drawer.Screen 
        name="FavoritesTab" 
        component={FavoritesScreens}
        options={{
          title: "Favorites",
          drawerIcon: getDrawerItemIcon('star'),
        }}
      />
      <Drawer.Screen 
        name="UserTab" 
        component={UserScreens}
        options={{
          title: "Me",
          drawerIcon: getDrawerItemIcon('user'),
        }}
      />
    </Drawer.Navigator>
  );
};

// Uncomment the navigator you want to use
// Export Tab Navigator
export const AppNavigator = TabNavigator;

// Export Drawer Navigator
// export const AppNavigator = DrawerNavigator;