import React from 'react';
import {useNandiServiceForm} from './nandi-service-form-container';
import {INandiServiceFormProps} from './types';
import {Screen} from 'components';
import {BaseForm} from './partials/base-form';

export const NandiServiceForm = () => {
  const {loading}: INandiServiceFormProps = useNandiServiceForm();
  return (
    <Screen rightIcon="cross" onRightPress={() => {}} header="Test Header">
      <BaseForm />
    </Screen>
  );
};
