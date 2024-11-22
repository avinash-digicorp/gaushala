import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {AssetSvg} from 'components';
import colors from 'theme';
import {svgType} from 'components/asset-svg/svg-icons';
import {BlurView} from '@react-native-community/blur';

interface TabSwitchProps {
  items: {value: String; icon: string}[];
  setValue: any;
  value: any;
}
export const TabSwitch = (props: TabSwitchProps) => {
  const {items, setValue, value} = props;
  const [switched, setSwitched] = useState(value);
  const isFirst = switched === items[0].value;
  useEffect(() => {}, [switched]);
  const onPress = v => {
    setSwitched(v);
    setValue(v);
  };
  return (
    <View style={styles.container}>
      <BlurView
        blurType="light"
        blurAmount={20}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.selectedTab,
          isFirst ? styles.selectedTabLeft : styles.selectedTabRight,
        ]}
        layout={LinearTransition}>
        <BlurView
          blurType="light"
          blurAmount={25}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      {items?.map?.((item, index) => {
        const isSelected = item.value === switched;
        return (
          <TouchableOpacity
            onPress={() => onPress(item.value)}
            key={index}
            style={[styles.tab]}>
            <AssetSvg name={item.icon as svgType} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#ffffff00',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: colors.white,
    overflow: 'hidden',
    height: 45,
    alignItems: 'center',
  },
  tab: {
    width: '49%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTabRight: {right: 5},
  selectedTabLeft: {left: 5},
  selectedTab: {
    backgroundColor: '#ffffff66',
    height: '100%',
    width: '50%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
