import React, {useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {BaseModalPickerProps} from './types';
import {ModalFieldView} from './partials/modal-field-view';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {AssetSvg, BaseLabel, ButtonView, Text} from 'components';
import {Portal} from 'react-native-paper';
import {BlurView} from '@react-native-community/blur';
import {NAVBAR_HEIGHT} from 'utils';

export const BaseModalPicker = (props: BaseModalPickerProps) => {
  const {data, value, onChange} = props;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dismissModal = () => bottomSheetRef.current?.close?.();
  const openModal = () => bottomSheetRef.current?.expand?.();
  return (
    <View>
      <ModalFieldView {...props} openModal={openModal} />
      <Portal>
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          enableDynamicSizing
          enablePanDownToClose
          backdropComponent={BackdropComponent}>
          <BottomSheetView style={styles.contentContainer}>
            <View className="flex-row border-b pb-3 border-gray-300 px-4 items-center justify-between">
              <BaseLabel
                {...props}
                label-class="text-lg font-medium text-primary-200"
              />
              <ButtonView onPress={dismissModal}>
                <AssetSvg width={16} height={16} name="cross" />
              </ButtonView>
            </View>
            <FlatList
              data={data}
              keyExtractor={item => item?.value}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
              ItemSeparatorComponent={() => (
                <View className="my-1 w-full border-b border-gray-200" />
              )}
              renderItem={({item, index}) => {
                const isSelected = item?.value === value;
                const onSelect = () => {
                  onChange?.(item?.value);
                  dismissModal();
                };
                return (
                  <ButtonView
                    onPress={onSelect}
                    key={item?.value}
                    className="flex-row items-center py-2 justify-between">
                    <Text
                      className={isSelected && 'text-primary'}
                      text={item?.name}
                    />
                    {isSelected && (
                      <AssetSvg width={16} height={16} name="check" />
                    )}
                  </ButtonView>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: NAVBAR_HEIGHT,
  },
});
BaseModalPicker.defaultProps = {};

export const BackdropComponent = (props: any) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0}>
    <BlurView
      blurRadius={20}
      blurAmount={20}
      blurType="dark"
      style={StyleSheet.absoluteFill}
    />
  </BottomSheetBackdrop>
);
