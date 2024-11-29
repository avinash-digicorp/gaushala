import React, {useState} from 'react';
import {useNandiServiceForm} from './nandi-service-form-container';
import {INandiServiceFormProps} from './types';
import {
  BaseButton,
  BaseInput,
  BaseModalPicker,
  DateTimePicker,
  Screen,
} from 'components';
import {GenderData} from 'store/common/helpers';
import t from 'locales/use-translation';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

export const NandiServiceForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const {loading, initialValues, onSubmit} = useNandiServiceForm();

  return (
    <Screen
      rightIcon="cross"
      onRightPress={() => {}}
      header={t('home.nandi_service')}>
      <Formik
        validationSchema={NandiServiceValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({handleChange, errors: formErrors, handleSubmit, values}) => {
          const errors = submitted ? formErrors : {};
          const onHandleSubmit = () => {
            setSubmitted(true);
            handleSubmit();
          };

          return (
            <View>
              <BaseInput
                placeholder={t('nandi_service.number')}
                label={t('nandi_service.number')}
                error={errors?.number}
                onChangeText={handleChange('number')}
                value={values?.number}
                keyboardType="numeric"
              />
              <BaseInput
                placeholder={t('nandi_service.nandi_name_or_number')}
                label={t('nandi_service.nandi_name_or_number')}
                error={errors?.nandi_name_or_number}
                onChangeText={handleChange('nandi_name_or_number')}
                value={values?.nandi_name_or_number}
              />
              <BaseInput
                placeholder={t(
                  'nandi_service.nandi_body_color_and_identification',
                )}
                label={t('nandi_service.nandi_body_color_and_identification')}
                error={errors?.nandi_body_color_and_identification}
                onChangeText={handleChange(
                  'nandi_body_color_and_identification',
                )}
                value={values?.nandi_body_color_and_identification}
              />
              <DateTimePicker
                placeholder={t('nandi_service.service_given_date')}
                label={t('nandi_service.service_given_date')}
                onChange={handleChange('service_given_date')}
                date={values?.service_given_date}
              />
              <BaseInput
                placeholder={t('nandi_service.gaay_name_or_number')}
                label={t('nandi_service.gaay_name_or_number')}
                error={errors?.gaay_name_or_number}
                onChangeText={handleChange('gaay_name_or_number')}
                value={values?.gaay_name_or_number}
              />
              <BaseInput
                placeholder={t('nandi_service.cow_identification_marks')}
                label={t('nandi_service.cow_identification_marks')}
                error={errors?.cow_identification_marks}
                onChangeText={handleChange('cow_identification_marks')}
                value={values?.cow_identification_marks}
              />
              <BaseModalPicker
                data={GenderData}
                placeholder={t('nandi_service.calf_gender')}
                label={t('nandi_service.calf_gender')}
                error={errors?.calf_gender}
                onChange={handleChange('calf_gender')}
                value={values?.calf_gender}
              />
              <BaseInput
                placeholder={t(
                  'nandi_service.calf_body_color_and_identification',
                )}
                label={t('nandi_service.calf_body_color_and_identification')}
                error={errors?.calf_body_color_and_identification}
                onChange={handleChange('calf_body_color_and_identification')}
                value={values?.calf_body_color_and_identification}
              />
              <BaseButton
                onPress={onHandleSubmit}
                title={t('button.submit')}
                loading={loading}
              />
            </View>
          );
        }}
      </Formik>
    </Screen>
  );
};

export const NandiServiceValidationSchema = yup.object().shape({
  number: yup.string().required(t('validation.required')),
  nandi_name_or_number: yup.string().required(t('validation.required')),
  nandi_body_color_and_identification: yup.string(),
  service_given_date: yup.string().required(t('validation.required')),
  gaay_name_or_number: yup.string().required(t('validation.required')),
  cow_identification_marks: yup.string().required(t('validation.required')),
  calf_gender: yup.string().required(t('validation.required')),
  calf_body_color_and_identification: yup.string(),
});
