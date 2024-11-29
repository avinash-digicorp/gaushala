import React from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  ViewProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AssetSvg, ButtonView, Text} from 'components';
import colors from 'theme';
import {fonts} from 'utils/fonts';
import {goBack} from 'navigation';
import {SCREEN_WIDTH} from 'utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const width = SCREEN_WIDTH * 0.9;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

const posterSize = 200;
const headerTop = 44 - 16;

const CompactHeader = (props: ScreenProps) => {
  const {sv, header, rightIcon, showBack} = props;
  const inset = useSafeAreaInsets();
  const opacityRange = [0, 1];
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sv.value, opacityRange, [0, 1]),
      paddingTop: inset.top === 0 ? 15 : inset.top,
    };
  });
  const onLeftPress = () => {
    if (props?.onLeftPress) {
      props.onLeftPress();
      return;
    }
    goBack();
  };
  return (
    <Animated.View style={[styles.compactHeader, opacityAnim]}>
      <ButtonView
        style={styles.topLeftIcon}
        show={showBack}
        onPress={onLeftPress}>
        <AssetSvg name="left_arrow" />
      </ButtonView>
      <Text style={styles.compactHeaderTitle}>{header}</Text>
      <ButtonView style={styles.topRightIcon} onPress={props?.onRightPress}>
        <AssetSvg name={rightIcon} />
      </ButtonView>
    </Animated.View>
  );
};

const ExpandedHeader = (props: ScreenProps) => {
  const {sv, header, rightIcon, showBack} = props;
  const inset = useSafeAreaInsets();
  const paddingTop = inset.top === 0 ? 15 : inset.top;
  const layoutY = useSharedValue(0);
  const opacityRange = [0, posterSize - (headerTop + inset.top) / 0.9];
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sv.value, opacityRange, [1, 0], Extrapolation.CLAMP),
    };
  });
  const colorRange = [
    -posterSize / 8,
    0,
    (posterSize - (headerTop + inset.top)) / 2,
  ];
  const textAnim = useAnimatedStyle(() => ({
    color: interpolateColor(sv.value, colorRange, [
      colors.gray3,
      colors.gray9,
      colors.gray3,
    ]),
  }));
  const textContainerAnim = useAnimatedStyle(() => {
    const scaleRange = [
      -posterSize / 8,
      0,
      (posterSize - (headerTop + inset.top)) / 2,
    ];
    const translateYRange = [
      layoutY.value - 1,
      layoutY.value,
      layoutY.value + 1,
    ];
    return {
      transform: [
        {scale: interpolate(sv.value, scaleRange, [1.5, 1, 0.95], 'clamp')},
        {translateY: interpolate(sv.value, translateYRange, [0, 0, -1])},
      ],
    };
  });
  const scaleAnim = useAnimatedStyle(() => {
    const scale = interpolate(sv.value, [-50, 0], [1.3, 1], {
      extrapolateLeft: 'extend',
      extrapolateRight: 'clamp',
    });
    return {transform: [{scale}]};
  });
  const onLeftPress = () => {
    if (props?.onLeftPress) {
      props.onLeftPress();
      return;
    }
    goBack();
  };
  const onLayout = (event: LayoutChangeEvent) => {
    'worklet';
    layoutY.value = event.nativeEvent.layout.y;
  };
  return (
    <Animated.View style={[styles.expandedContainer, opacityAnim]}>
      <AnimatedLinearGradient
        useAngle
        angleCenter={{x: 1, y: 1}}
        style={[styles.backGradient, scaleAnim]}
        colors={backGradient}
      />
      <Animated.View
        onLayout={onLayout}
        style={[styles.textContainer, textContainerAnim]}>
        <Text numberOfLines={2} style={[styles.bigHeader, textAnim]}>
          {header}
        </Text>
      </Animated.View>
      <AnimatedLinearGradient
        style={[styles.bottomGradient, scaleAnim]}
        colors={bottomGradient}
      />
      <Animated.View style={[styles.iconContainer, {paddingTop}]}>
        <ButtonView
          style={styles.topLeftIcon}
          show={showBack}
          onPress={onLeftPress}>
          <AssetSvg name="left_arrow" />
        </ButtonView>
        <ButtonView style={styles.topRightIcon} onPress={props?.onRightPress}>
          <AssetSvg name={rightIcon} />
        </ButtonView>
      </Animated.View>
    </Animated.View>
  );
};

interface ScreenProps extends ViewProps {
  header?: string;
  showBack?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: string;
  sv?: SharedValue<number>;
}

export const Screen = (props: ScreenProps) => {
  const {} = props;
  const sv = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      sv.value = event.contentOffset.y;
    },
  });

  return (
    <Animated.View style={styles.flex1}>
      <CompactHeader {...props} sv={sv} />
      <ExpandedHeader {...props} sv={sv} />
      <Animated.View style={styles.flex1}>
        <AnimatedScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.flex1}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={styles.wrapper}>
            {props?.children}
          </Animated.View>
        </AnimatedScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {paddingTop: posterSize, paddingBottom: 30},
  iconContainer: {
    zIndex: 999,
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeftIcon: {width: width * 0.1, minWidth: width * 0.1},
  topRightIcon: {
    width: width * 0.1,
    minWidth: width * 0.1,
    alignItems: 'flex-end',
  },
  flex1: {flex: 1},
  compactHeaderTitle: {
    fontFamily: fonts.medium,
    width: width * 0.8,
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray9,
    textAlign: 'center',
  },
  bottomGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  textContainer: {
    top: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backGradient: {width: '100%', height: '100%'},
  bigHeader: {
    fontFamily: fonts.extraBold,
    fontWeight: '700',
    fontSize: 24,
    color: colors.gray9,
    textAlign: 'center',
  },
  compactHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
    backgroundColor: 'white',
  },
  expandedContainer: {
    height: posterSize,
    width: Dimensions.get('screen').width,
    position: 'absolute',
  },
  imageStyle: {
    height: posterSize,
    width: '100%',
    resizeMode: 'cover',
  },
});

const defaultProps = {header: '', showBack: true};
Screen.defaultProps = defaultProps;
ExpandedHeader.defaultProps = defaultProps;
CompactHeader.defaultProps = defaultProps;
const bottomGradient = [
  '#ffffff00',
  '#ffffff1A',
  '#ffffff4D',
  '#ffffff80',
  '#ffffffCC',
  '#ffffff',
];
const backGradient = [colors.white, '#FFD4D7bb', colors.white];
