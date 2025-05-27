import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from './redux/store';
import AppNavigator from './navigation/AppNavigator'; 
import { checkLoginStatus } from './redux/slices/userSlice';

const InitApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, []);

  return <AppNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitApp />
      </NavigationContainer>
    </Provider>
  );
}
