import {Dimensions, StatusBar} from 'react-native';
import {isAndroid} from './helper';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const DEVICE_HEIGHT = Dimensions.get('screen').height;
export const NAVBAR_HEIGHT = isAndroid
  ? DEVICE_HEIGHT - SCREEN_HEIGHT + StatusBar.currentHeight
  : 20;

export const isMajorScreenHeight = SCREEN_HEIGHT >= 800;

export const isVerySmallScreen = SCREEN_WIDTH <= 340;

export const modalHeight = SCREEN_HEIGHT * 0.84;

export const hitSlop = (top = 20, right = top, bottom = top, left = top) => ({
  top,
  right,
  bottom,
  left,
});

export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
