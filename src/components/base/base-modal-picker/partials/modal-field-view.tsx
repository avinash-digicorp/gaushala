import {View} from 'react-native';
import React from 'react';
import {BaseModalPickerProps} from '../types';
import {BaseLabel, ButtonView, Text} from 'components';
import {cn} from 'theme';

export const ModalFieldView = (props: BaseModalPickerProps) => {
  const {placeholder, value, disabled, error, openModal} = props;

  return (
    <View className={cn(['px-4', disabled && 'opacity-70'])}>
      <BaseLabel {...props} />
      <ButtonView
        onPress={openModal}
        scale={0.98}
        className={cn([
          'border rounded-xl justify-center px-4 border-primary-300 w-full h-12',
          error && 'border-red-800',
        ])}>
        <Text
          className={cn([
            'text-gray-800',
            value && 'text-gray-500',
            error && 'text-red-800',
          ])}
          text={value ?? placeholder}
        />
      </ButtonView>

      <Text
        hide={!error}
        className={'text-red-800 text-xs mt-1'}
        text={error}
      />
    </View>
  );
};
