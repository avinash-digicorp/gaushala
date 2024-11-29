import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  DeleteButtonProps,
  PlaceholderProps,
  AnimatedInputProps,
} from './prop-types';
import {AssetSvg} from 'components/';
import colors from 'theme';
import {fonts} from 'utils/fonts';

export const BaseInput = (props: AnimatedInputProps, ref) => {
  const {
    borderColor,
    activeborderColor,
    deleteIconColor,
    style,
    containerStyle,
    defaultValue,
    onChangeText,
    onFocus,
    onBlur,
  } = props;
  const [text, setText] = useState(defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = ref ?? useRef<TextInput>(null);

  const styles = {
    container: {
      borderColor: isFocused ? activeborderColor : borderColor,
      borderWidth: 1,
      height: 48,
      fontSize: 16,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      marginBottom: 15,
      ...containerStyle,
    } as ViewStyle,
    textInput: {
      fontFamily: fonts.regular,
      fontSize: 16,
      flex: 1,
      height: '100%',
      paddingHorizontal: 10,
    },
  };

  const deleteButtonAnimationProgress = useSharedValue(text === '' ? 0 : 1);
  const placeholderAnimationProgress = useSharedValue(text === '' ? 0 : 1);

  useEffect(() => {
    deleteButtonAnimationProgress.value = withTiming(text === '' ? 0 : 1);
    placeholderAnimationProgress.value = withDelay(
      20,
      withTiming(text === '' && !isFocused ? 0 : 1, {duration: 50}),
    );
  }, [isFocused, text]);

  const focusInput = () => {
    // @ts-ignore
    inputRef?.current?.focus();
  };
  const handlePressDelete = () => {
    handleChangeText('');
    // @ts-ignore
    inputRef?.current?.focus();
  };
  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  const handleChangeText = (text: string) => {
    setText(text);
    onChangeText?.(text);
  };

  return (
    <TouchableWithoutFeedback onPress={focusInput}>
      <View style={styles.container}>
        <TextInput
          {...props}
          placeholder=""
          style={[styles.textInput, style]}
          ref={inputRef}
          value={text}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <DeleteButton
          {...{
            handlePressDelete,
            deleteIconColor,
            deleteButtonAnimationProgress,
          }}
        />
        <Placeholder
          placeholderAnimationProgress={placeholderAnimationProgress}
          {...props}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const DeleteButton = ({
  deleteButtonAnimationProgress,
  deleteIconColor,
  handlePressDelete,
}: DeleteButtonProps) => {
  const style = useAnimatedStyle(() => ({
    marginRight: 14,
    opacity: interpolate(deleteButtonAnimationProgress.value, [0, 1], [0, 1]),
    transform: [
      {
        translateX: interpolate(
          deleteButtonAnimationProgress.value,
          [0, 1],
          [8, 0],
        ),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback onPress={handlePressDelete}>
      <Animated.View style={style}>
        <AssetSvg name="cross" width={16} height={16} fill={colors.primary} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const Placeholder = ({
  placeholder,
  placeholderTextStyle,
  placeholderAnimationProgress,
  backgroundColor,
}: PlaceholderProps) => {
  const styles = {
    placeholderContainerStyle: useAnimatedStyle(() => ({
      position: 'absolute',
      backgroundColor: backgroundColor ?? 'black',
      paddingHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [0, 5],
        Extrapolate.CLAMP,
      ),
      marginHorizontal: interpolate(
        placeholderAnimationProgress.value,
        [0.6, 1],
        [3, 0],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            placeholderAnimationProgress.value,
            [0, 1],
            [0.765, -25],
          ),
        },
        {translateX: 15},
      ],
    })),
    placeholderStyle: useAnimatedStyle(() => ({
      fontFamily: fonts.regular,
      color: interpolateColor(
        placeholderAnimationProgress.value,
        [0, 1],
        [colors.gray4, colors.primary2],
      ),
      fontSize: interpolate(
        placeholderAnimationProgress.value,
        [0, 1],
        [15.5, 13],
      ),
      ...placeholderTextStyle,
    })),
  };

  return (
    <>
      {placeholder && placeholder !== '' ? (
        <Animated.View style={styles.placeholderContainerStyle}>
          <Animated.Text style={styles.placeholderStyle}>
            {placeholder}
          </Animated.Text>
        </Animated.View>
      ) : (
        <></>
      )}
    </>
  );
};

BaseInput.defaultProps = {
  borderColor: colors.primary3,
  activeborderColor: colors.primary,
  deleteIconColor: colors.primary,
  backgroundColor: colors.white,
  placeholderTextColor: colors.primary2,
  containerStyle: {margin: 15},
};
