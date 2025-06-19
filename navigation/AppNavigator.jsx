
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';


import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import SignupEmailScreen from '../screens/Auth/SignUp/SignupEmailScreen';
import SignupNameScreen from '../screens/Auth/SignUp/SignupNameScreen';
import SignupAvatarScreen from '../screens/Auth/SignUp/SignupAvatarScreen';
import SignupUsernameScreen from '../screens/Auth/SignUp/SignupUsernameScreen';
import SignupPasswordScreen from '../screens/Auth/SignUp/SignupPasswordScreen';
import CommentsScreen from '../screens/Home/CommentsScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import UploadScreen from '../screens/Upload/UploadScreen';
import UploadStoryScreen from '../screens/Upload/UploadStoryScreen';
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
import NotificationsScreen from '../screens/Home/NotificationsScreen'; 
import CreateScreen from '../screens/Profile/CreateScreen'; 

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
          height: Platform.OS === 'android' ? 80 : 70, // slightly decreased height
          paddingBottom: Platform.OS === 'android' ? 10 : 20 // add bottom padding
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
        options={{
		tabBarIcon: ({ focused }) => (
            <Feather 
              name="user" 
              size={24} 
              color={focused ? "#000000" : "#999999"} 
            />
          )
	}}
      />
    </Tab.Navigator>
  );
}


export default function AppNavigator() {
  const user = useSelector((state) => state.auth.user);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
          <RootStack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={({ navigation, route }) => ({
            headerShown: false,
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
          {/* Comment Screen */}
          
          <RootStack.Screen name="CommentsScreen" component={CommentsScreen} />
          {/* Notifications Screen */}
          <RootStack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              headerShown: false, 
            }}
          />
          {/* PostDetailScreen */}
          <RootStack.Screen 
            name="PostDetail" 
            component={PostDetailScreen}
            options={{
              headerShown: false 
            }}
          />
          
          {/* Settings Screen */}
          <RootStack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              headerShown: false 
            }}
          />
          
          {/* Saved Posts Screen */}
          <RootStack.Screen 
            name="SavedPosts" 
            component={SavedPostsScreen}
            options={{
              headerShown: false,
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
              headerShown: false,
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
              headerShown: false,
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
              headerShown: false,
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
              headerShown: false,
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

          {/* Upload Story Screen */}
          <RootStack.Screen 
          name="UploadStory" 
          component={UploadStoryScreen} 
          options={{ headerShown: false }}
          />

          
          {/* About App Screen */}
          <RootStack.Screen 
            name="AboutApp" 
            component={AboutAppScreen}
            options={{
              headerShown: false,
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

      {/* Create Screen */}
      <RootStack.Screen
        name="Create"
        component={CreateScreen}
        options={{ headerShown: false }} 
          />
        </>
      ) : (
        <>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Signup" component={SignupScreen} />
          {/* Subsequent steps in the signup flow */}
          <RootStack.Screen name="SignupEmail" component={SignupEmailScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="SignupName" component={SignupNameScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="SignupAvatar" component={SignupAvatarScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="SignupUsername" component={SignupUsernameScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="SignupPassword" component={SignupPasswordScreen} options={{ headerShown: false }} />
        </>
      )}
    </RootStack.Navigator>
  );
} 