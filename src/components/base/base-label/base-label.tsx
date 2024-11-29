import React from 'react';
import {hasTextLength, isFunctionExist} from 'utils/condition';
import {AssetSvg, ButtonView, Text} from 'components';
import {IProps} from './type.d';
import {cn} from 'theme';
import {View} from 'react-native';

export const BaseLabel = (props: IProps) => {
  const {withTranslation, error, label, show} = props;

  if (!show) return <React.Fragment />;

  return (
    <View className={cn(['flex-row mb-2', props?.className])}>
      <Text
        show={hasTextLength(label)}
        text={label}
        {...(withTranslation && {tx: label})}
        {...(!withTranslation && {text: label})}
        className={cn([
          'size-sm',
          props?.['label-class'],
          error && 'text-red-800',
        ])}
      />
    </View>
  );
};

BaseLabel.defaultProps = {show: true};
