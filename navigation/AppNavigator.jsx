import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import UploadScreen from '../screens/Upload/UploadScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import PostDetailScreen from '../screens/Profile/PostDetailScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SavedPostsScreen from '../screens/Profile/SavedPostsScreen';
import ArchivedPostsScreen from '../screens/Profile/ArchivedPostsScreen';
import AccountSettingsScreen from '../screens/Settings/AccountSettingsScreen';
import PrivacySettingsScreen from '../screens/Settings/PrivacySettingsScreen';
import HelpCenterScreen from '../screens/Settings/HelpCenterScreen';
import AboutAppScreen from '../screens/Settings/AboutAppScreen';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#DBDBDB',
          elevation: 0,
          height: 50
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="home" 
              size={24} 
              color={focused ? "#000000" : "#999999"} 
            />
          )
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="search" 
              size={24} 
              color={focused ? "#000000" : "#999999"} 
            />
          )
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather 
              name="plus-square" 
              size={24} 
              color={focused ? "#000000" : "#999999"} 
            />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            // Use the default Feather user icon if no avatar is available
            const avatarUri = route.params?.user?.avatar || 'https://i.pravatar.cc/150?img=12';
            
            return focused ? (
              <Image
                source={{ uri: avatarUri }}
                style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#000000'
                }}
              />
            ) : (
              <Image
                source={{ uri: avatarUri }}
                style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 12,
                  opacity: 0.5
                }}
              />
            );
          }
        })}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
          <RootStack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerLeft: () => (
          <Feather 
          name="arrow-left" 
          size={24} 
          color="#000000" 
          style={{ marginLeft: 10 }} 
          onPress={() => navigation.goBack()}
          />
          )
          })}
          />

          {/* PostDetailScreen */}
          <RootStack.Screen 
            name="PostDetail" 
            component={PostDetailScreen}
            options={{
              headerShown: false // Using custom header in the component
            }}
          />
          
          {/* Settings Screen */}
          <RootStack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              headerShown: false // Custom header in the component
            }}
          />
          
          {/* Saved Posts Screen */}
          <RootStack.Screen 
            name="SavedPosts" 
            component={SavedPostsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Saved Posts',
              headerLeft: ({ onPress }) => (
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color="#000000" 
                  style={{ marginLeft: 10 }} 
                  onPress={onPress}
                />
              )
            }}
          />
          
          {/* Archived Posts Screen */}
          <RootStack.Screen 
            name="ArchivedPosts" 
            component={ArchivedPostsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Archived Posts',
              headerLeft: ({ onPress }) => (
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color="#000000" 
                  style={{ marginLeft: 10 }} 
                  onPress={onPress}
                />
              )
            }}
          />
          
          {/* Account Settings Screen */}
          <RootStack.Screen 
            name="AccountSettings" 
            component={AccountSettingsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Account',
              headerLeft: ({ onPress }) => (
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color="#000000" 
                  style={{ marginLeft: 10 }} 
                  onPress={onPress}
                />
              )
            }}
          />
          
          {/* Privacy Settings Screen */}
          <RootStack.Screen 
            name="PrivacySettings" 
            component={PrivacySettingsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Privacy',
              headerLeft: ({ onPress }) => (
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color="#000000" 
                  style={{ marginLeft: 10 }} 
                  onPress={onPress}
                />
              )
            }}
          />
          
          {/* Help Center Screen */}
          <RootStack.Screen 
            name="HelpCenter" 
            component={HelpCenterScreen}
            options={{
              headerShown: true,
              headerTitle: 'Help Center',
              headerLeft: ({ onPress }) => (
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color="#000000" 
                  style={{ marginLeft: 10 }} 
                  onPress={onPress}
                />
              )
            }}
          />
          
          {/* About App Screen */}
          <RootStack.Screen 
            name="AboutApp" 
            component={AboutAppScreen}
            options={{
              headerShown: true,
              headerTitle: 'About',
              headerLeft: ({ onPress }) => (
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color="#000000" 
                  style={{ marginLeft: 10 }} 
                  onPress={onPress}
                />
              )
            }}
          />
        </>
      ) : (
        <>
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        </>
      )}
    </RootStack.Navigator>
  );
}

// // Temporary placeholder screen until real screens are implemented
// import { View, Text } from 'react-native';
// import SavedPostsScreen from '../screens/Profile/SavedPostsScreen';
// import AccountSettingsScreen from '../screens/Settings/AccountSettingsScreen';
// import PrivacySettingsScreen from '../screens/Settings/PrivacySettingsScreen';
// import HelpCenterScreen from '../screens/Settings/HelpCenterScreen';
// import AboutAppScreen from '../screens/Settings/AboutAppScreen';

function PlaceholderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Coming Soon</Text>
      <Text style={{ fontSize: 14, color: '#777', marginTop: 10 }}>This feature is under development</Text>
    </View>
  );
}