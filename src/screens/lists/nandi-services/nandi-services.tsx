import React from 'react';
import {Screen} from 'components';
import {useNandiServices} from './nandi-services-container';
import t from 'locales/use-translation';
import {FlatList} from 'react-native';
import {NandiServiceItem} from './nandi-service-item';
import {hasLength} from 'utils';
import {PlusButton} from 'components/common';
import {navigateTo, routes} from 'navigation';

export const NandiServices = () => {
  const {
    loading,
    nandi_service,
    deleteItem,
    selectedItems,
    setSelectedItems,
    navigation,
  } = useNandiServices();
  return (
    <>
      <Screen
        rightIcon={hasLength(selectedItems) ? 'menu' : undefined}
        onRightPress={navigation.goBack}
        header={t('header.nandi_services')}>
        <FlatList
          data={nandi_service}
          renderItem={v => (
            <NandiServiceItem
              {...v}
              key={v.item.id}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              onClick={deleteItem}
            />
          )}
          keyExtractor={item => item.id?.toString?.()}
        />
      </Screen>
      <PlusButton onPress={() => navigateTo(routes.NANDI_SERVICE_FORM)} />
    </>
  );
};
