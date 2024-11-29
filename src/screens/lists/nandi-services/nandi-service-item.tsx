import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import SwipeDeleteWrapper from './swipe-delete-wrapper';
import {haptic, makeTitleCase} from 'utils';
import {AssetSvg, Text} from 'components';
import Animated, {
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import moment from 'moment';
import {fonts} from 'utils/fonts';

export const NandiServiceItem = props => {
  const {item, selectedItems, setSelectedItems} = props;

  const onLongPress = () => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter(id => id != item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
    haptic();
  };
  const onPress = () => {
    if (selectedItems.length) {
      onLongPress();
      return;
    }
  };
  const isSelected = selectedItems.includes(item.id);
  return (
    <SwipeDeleteWrapper {...props}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.item}>
        {isSelected && (
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            className="bg-gray-200 mr-2 border border-gray-100 w-6 h-6 items-center justify-center rounded-md">
            <AssetSvg width={16} height={16} name="check" />
          </Animated.View>
        )}
        <Animated.View
          layout={LinearTransition.duration(100)}
          style={styles.itemContainer}>
          <View>
            <Text className="text-sm text-primary-200 font-semibold mb-1">{`#${item?.number}`}</Text>
            <Text className="text-sm font-medium">
              {item?.nandi_name_or_number}
            </Text>
          </View>
          <View className="items-end justify-between">
            <View className="items-center flex-row gap-1">
              <AssetSvg width={16} height={16} name="clock" />
              <Text
                className="text-xs text-text-gray-600"
                text={moment(item?.service_given_date).format(
                  'DD-MM-YYYY HH:mm',
                )}
              />
            </View>
            <Text
              className="text-xs text-primary-200"
              text={makeTitleCase(item?.calf_gender)}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </SwipeDeleteWrapper>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
