import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const LocationPicker = ({ onLocationPicked }) => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (pickedLocation) {
      onLocationPicked(pickedLocation);
    }
  }, [pickedLocation, onLocationPicked]);

  const getLocationHandler = async () => {
    setIsFetching(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setIsFetching(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color="#ccc" />
        ) : pickedLocation ? (
          <Text>Location Picked!</Text>
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={getLocationHandler}>
          <Text>Get User Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    actions: {
      flexDirection: 'row',
    },
  }
);

export default  LocationPicker;
// This component allows the user to pick a location using their device's GPS.