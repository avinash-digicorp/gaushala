import {StyleSheet} from 'react-native';
import React from 'react';
import {routes} from 'navigation/navigation-routes';
import {AnimatedIcon} from 'components';
import {AnimatedIconType} from 'assets/animated-icons';

const icons = {
  [routes.MAIN_HOME]: 'home',
  [routes.MAIN_WEATHER]: 'weather',
  [routes.MAIN_SETTINGS]: 'settings',
};
const TabButton = props => {
  const {focused, routeName} = props;
  const icon = icons[routeName] as AnimatedIconType;
  return <AnimatedIcon autoPlay={focused} name={icon} style={[styles.icon]} />;
};

const styles = StyleSheet.create({
  icon: {width: 24, height: 24},
  iconWeather: {transform: [{scale: 1.3}, {translateY: -1}]},
});

export default TabButton;
