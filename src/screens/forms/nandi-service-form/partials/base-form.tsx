import {View} from 'react-native';
import React from 'react';
import {BaseInput, BaseModalPicker} from 'components';
import t from 'locales/use-translation';

export const BaseForm = () => {
  return (
    <View>
      <BaseModalPicker
        data={GenderData}
        placeholder={t('nandi_service.calf_gender')}
        label={t('nandi_service.calf_gender')}
      />
      <BaseInput
        placeholder={'Email'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <BaseInput
        placeholder={'Email'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <BaseInput
        placeholder={'Email'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <BaseInput placeholder={'Phone'} keyboardType="phone-pad" />
      <BaseInput
        placeholder={'Email'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
};

const GenderData = [
  {id: 1, value: 'male', name: t('cow_gender.male')},
  {id: 1, value: 'female', name: t('cow_gender.female')},
  {id: 1, value: 'calf_male', name: t('cow_gender.calf_male')},
  {id: 1, value: 'calf_female', name: t('cow_gender.calf_female')},
];
