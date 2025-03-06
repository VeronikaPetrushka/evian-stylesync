import React, { useEffect } from 'react';
import { Image, Animated, ImageBackground } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IntroScreen from './src/scrns/IntroScreen';
import WardrobeScreen from './src/scrns/WardrobeScreen';
import AddItemScreen from './src/scrns/AddItemScreen';
import ItemScreen from './src/scrns/ItemScreen';
import LooksScreen from './src/scrns/LooksScreen';
import CreateLookScreen from './src/scrns/CreateLookScreen';
import InsightsScreen from './src/scrns/InsightsScreen';
import ReadScreen from './src/scrns/ReadScreen';
import TestScreen from './src/scrns/TestScreen';

enableScreens();

const Stack = createStackNavigator();

const LoaderScreen = ({ navigation }) => {
      const progress = new Animated.Value(0);
  
      useEffect(() => {
          Animated.timing(progress, {
              toValue: 100,
              duration: 2000,
              useNativeDriver: false,
          }).start(() => {
              navigation.replace('IntroScreen');
          });
      }, []);
  
      return (
            <ImageBackground source={require('./src/assts/loaders/back.png')} style={{flex: 1}}>
                <Image source={require('./src/assts/loaders/logo.png')} style={{width: 285, height: 100, resizeMode: 'contain', alignSelf: 'center', position: 'absolute', bottom: 100}} />
            </ImageBackground>
      );
  };

const App = () => {

  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName={"LoaderScreen" }>
                  <Stack.Screen 
                        name="LoaderScreen" 
                        component={LoaderScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="IntroScreen" 
                        component={IntroScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="WardrobeScreen" 
                        component={WardrobeScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="AddItemScreen" 
                        component={AddItemScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ItemScreen" 
                        component={ItemScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="LooksScreen" 
                        component={LooksScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="CreateLookScreen" 
                        component={CreateLookScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="InsightsScreen" 
                        component={InsightsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ReadScreen" 
                        component={ReadScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="TestScreen" 
                        component={TestScreen} 
                        options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
          </NavigationContainer>
    );
};

export default App;
