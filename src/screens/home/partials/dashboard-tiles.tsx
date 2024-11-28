import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeInDown, LinearTransition} from 'react-native-reanimated';
import {AssetSvg, Text} from 'components';
import {LocalizationKeys} from 'locales/use-translation';
import colors, {cn} from 'theme';
import {BlurView} from '@react-native-community/blur';
import {navigateTo, routes} from 'navigation';

const AnimatedButton = Animated.createAnimatedComponent(Pressable);
interface DashboardTilesProps {
  isColumn: boolean;
  dashboardItems: any[];
}
export default (props: DashboardTilesProps) => {
  const {isColumn, dashboardItems} = props;
  return (
    <View style={[styles.wrapper, isColumn && styles.columnWrapper]}>
      {dashboardItems?.map?.((item, index) => {
        const onPress = () => navigateTo(item?.formRoute, item);
        return (
          <AnimatedButton
            onPress={onPress}
            entering={FadeInDown.delay(100 * index)}
            layout={LinearTransition}
            key={item.key}
            style={[styles.item, isColumn && styles.itemColumn]}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={20}
              blurRadius={20}
            />
            <Animated.View layout={LinearTransition}>
              <AssetSvg
                width={isColumn ? 100 : 130}
                height={isColumn ? 100 : 130}
                name={item.value}
              />
            </Animated.View>
            <Animated.View layout={LinearTransition}>
              <Text
                className={cn([
                  'font-medium text-center text-gray-900',
                  !isColumn && 'ml-2',
                ])}
                tx={`home.${item.value}` as LocalizationKeys}
              />
            </Animated.View>
          </AnimatedButton>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexWrap: 'wrap',
    gap: 15,
    paddingBottom: 150,
    width: '95%',
    paddingTop: 25,
    alignSelf: 'center',
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemColumn: {
    width: '47%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  item: {
    overflow: 'hidden',
    backgroundColor: colors.transparent,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
});
