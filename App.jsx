import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

enableScreens();

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
      const progress = new Animated.Value(0);
  
      useEffect(() => {
          Animated.timing(progress, {
              toValue: 100,
              duration: 5000,
              useNativeDriver: false,
          }).start(() => {
              navigation.replace('StarterScreen');
          });
      }, []);
  
      return (
          <LinearGradient colors={["#000", "#300202"]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./src/assets/decor/logo-white.png')} style={{ width: 290, height: 77, resizeMode: 'contain', marginBottom: 30 }} />
              
              <View style={{ width: '85%', height: 24, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 24, overflow: 'hidden' }}>
                  <Animated.View style={{
                      width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
                      height: '100%',
                      backgroundColor: '#cf0000',
                  }} />
              </View>
          </LinearGradient>
      );
  };

const App = () => {

  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName={"SplashScreen" }>
                  <Stack.Screen 
                        name="SplashScreen" 
                        component={SplashScreen} 
                        options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
          </NavigationContainer>
    );
};

export default App;
