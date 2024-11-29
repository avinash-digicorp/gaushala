import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigation-action';
import {CommonNavigator} from './navigators';
import {BottomTabNavigator} from './navigators/bottom-tab-navigation';
import {Animated} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppNavigationContainer} from './navigation-container';
import {routes} from './navigation-routes';
import {AuthNavigator} from './navigators/auth-navigator';

const Stack = createNativeStackNavigator();

export const ApplicationNavigator = () => {
  const {style, isLoggedIn, theme} = useAppNavigationContainer();

  return (
    // <Animated.View style={style} className="w-full flex-1 h-full">
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? routes.MAIN_HOME : routes.WELCOME}
        screenOptions={{headerShown: false}}>
        {isLoggedIn ? BottomTabNavigator : AuthNavigator}
        {CommonNavigator}
      </Stack.Navigator>
    </NavigationContainer>
    // </Animated.View>
  );
};
