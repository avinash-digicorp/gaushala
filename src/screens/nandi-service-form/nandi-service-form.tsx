import React from 'react';
import {View} from 'react-native'
import {useNandiServiceForm} from './nandi-service-form-container'
import {Header} from './partials/header'
import {INandiServiceFormProps} from './types'

export const NandiServiceForm = () => {
  const {loading}: INandiServiceFormProps = useNandiServiceForm()
  return (
    <View>
      <Header />    
    </View>
  )
}
