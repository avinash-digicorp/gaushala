import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BaseModalPickerProps} from '../types';
import {BaseLabel, ButtonView, Text} from 'components';
import {cn} from 'theme';
import {hasTextLength} from 'utils';

export const ModalFieldView = (props: BaseModalPickerProps) => {
  const {placeholder, data, value, disabled, error, openModal} = props;
  const textValue = data?.find(d => d.value === value)?.name;
  return (
    <View
      style={styles.container}
      className={cn(['px-4', disabled && 'opacity-70'])}>
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
            'text-gray-500',
            hasTextLength(textValue) && 'text-gray-800',
            error && 'text-red-800',
          ])}
          text={hasTextLength(textValue) ? textValue : placeholder}
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});
