import React from 'react';
import {hasTextLength} from 'utils/condition';
import {Text} from 'components';
import {IProps} from './type.d';
import {cn} from 'theme';
import {View} from 'react-native';

export const BaseLabel = (props: IProps) => {
  const {withTranslation, error, label, show} = props;

  if (!show) return <React.Fragment />;

  return (
    <View className={cn(['flex-row mb-2', props?.class])}>
      <Text
        show={hasTextLength(label)}
        text={label}
        {...(withTranslation && {tx: label})}
        {...(!withTranslation && {text: label})}
        className={cn([props?.['label-class'], error && ''])}
      />
    </View>
  );
};

BaseLabel.defaultProps = {show: true};
