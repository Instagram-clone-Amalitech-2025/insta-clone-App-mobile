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
import PostDetailScreen from '../screens/Profile/PostDetailScreen'; // Import our new PostDetailScreen

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
            options={{
              headerShown: true,
              headerTitle: 'Edit Profile',
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
          {/* Add PostDetailScreen to the main navigator stack */}
          <RootStack.Screen 
            name="PostDetail" 
            component={PostDetailScreen}
            options={{
              headerShown: false // Using custom header in the component
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