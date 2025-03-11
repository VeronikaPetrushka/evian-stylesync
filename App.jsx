import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
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

const loaders = [
      require('./src/assts/loaders/1.jpg'),
      require('./src/assts/loaders/2.jpg'),
    ];

const App = () => {
      const [currentLoader, setCurrentLoader] = useState(0);
      const slideAnimation1 = useRef(new Animated.Value(0)).current;
      const slideAnimation2 = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  
      useEffect(() => {
            const animationTimeout = setTimeout(() => {
            slideToNextLoader();
      }, 1500);
  
      const navigation = setTimeout(() => {
            navigateToMenu();
            }, 4000);
  
            return () => {
                  clearTimeout(animationTimeout);
                  clearTimeout(navigation);
            };
      }, []);
  
      const slideToNextLoader = () => {
            Animated.parallel([
            Animated.timing(slideAnimation1, {
                  toValue: -Dimensions.get('window').width,
                  duration: 1500,
                  useNativeDriver: true,
            }),
            Animated.timing(slideAnimation2, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true,
                  }),
            ]).start(() => {
                  setCurrentLoader(1);
            });
      };
  
      const navigateToMenu = () => {
            setCurrentLoader(2);
      };  

  return (
          <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                  headerShown: false,
                  animation: 'fade',
                  animationDuration: 1000,
                }}>
                  {currentLoader < 2 ? (
                        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
                        {() => (
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                              <Animated.Image
                                    source={loaders[0]}
                                    style={[
                                    { 
                                          width: '100%', 
                                          height: '100%', 
                                          position: 'absolute',
                                    },
                                    { 
                                          transform: [{ translateX: slideAnimation1 }],
                                    },
                                    ]}
                              />
                              <Animated.Image
                                    source={loaders[1]}
                                    style={[
                                    { 
                                          width: '100%', 
                                          height: '100%', 
                                          position: 'absolute',
                                    },
                                    { 
                                          transform: [{ translateX: slideAnimation2 }],
                                    },
                                    ]}
                              />
                        </View>
                        )}
                        </Stack.Screen>
                  ) : (
                        <Stack.Screen 
                              name="IntroScreen" 
                              component={IntroScreen} 
                              options={{ headerShown: false }} 
                        />
                  )}    
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
