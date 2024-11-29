import React from 'react';
import {Screen} from 'components';
import {useNandiServices} from './nandi-services-container';
import {INandiServicesProps} from './types';
import t from 'locales/use-translation';

export const NandiServices = () => {
  const {loading, navigation}: INandiServicesProps = useNandiServices();
  return (
    <Screen
      onRightPress={navigation.goBack}
      header={t('header.nandi_services')}></Screen>
  );
};
