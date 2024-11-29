import React from 'react';
import {AnimatedIcon} from 'components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {BounceInDown} from 'react-native-reanimated';
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export const PlusButton = ({onPress}: {onPress?: () => void}) => {
  return (
    <AnimatedButton
      onPress={onPress}
      activeOpacity={0.95}
      entering={BounceInDown}
      className="absolute bottom-10 right-5 bg-primary rounded-full items-center justify-center">
      <AnimatedIcon name="plus" autoPlay style={styles.plus} />
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  plus: {width: 50, height: 50},
});
