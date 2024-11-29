import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeInDown, LinearTransition} from 'react-native-reanimated';
import {AssetSvg, Text} from 'components';
import {LocalizationKeys} from 'locales/use-translation';
import colors, {cn} from 'theme';
import {BlurView} from '@react-native-community/blur';
import {navigateTo} from 'navigation';

const AnimatedButton = Animated.createAnimatedComponent(Pressable);
interface DashboardTilesProps {
  isColumn: boolean;
  dashboardItems: any[];
  counts: any;
}
export default (props: DashboardTilesProps) => {
  const {isColumn, counts, dashboardItems} = props;
  return (
    <View style={[styles.wrapper, isColumn && styles.columnWrapper]}>
      {dashboardItems?.map?.((item, index) => {
        const onPress = () => navigateTo(item?.formRoute, item);
        const count = counts?.[item?.value];
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
            {count && (
              <Animated.View
                style={styles.shadow}
                className="absolute items-center justify-center rounded-md"
                layout={LinearTransition}>
                <Text
                  className={cn(['font-semibold text-center text-gray-100'])}
                  text={count}
                />
              </Animated.View>
            )}
          </AnimatedButton>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 7,
    shadowOffset: {width: 0, height: 0},
    elevation: 15,
    top: 5,
    right: 5,
  },
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
