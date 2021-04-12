
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {OnBoarding} from './src/screens/OnBoarding';

const stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer >
     <stack.Navigator>
       <stack.Screen name = {"OnBoarding"} component = {OnBoarding} options = {{headerShown: false}}></stack.Screen>
     </stack.Navigator>

    </NavigationContainer>
  );
};



export default App;
