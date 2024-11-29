import React, {useState} from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import {useHomeContainer} from './home-container';
import {ASSET_IMAGES} from 'assets/images';
import {ScrollView, TabSwitch} from 'components';
import DashboardTiles from './partials/dashboard-tiles';
import {BlurView} from '@react-native-community/blur';
import {isAndroid} from 'utils/helper';

export default () => {
  const [gridType, setGridType] = useState<string>(gridTypes[0].value);
  const {dashboardItems, counts} = useHomeContainer();
  const isColumn = gridType === gridTypes[0].value;
  return (
    <ImageBackground
      source={ASSET_IMAGES.bg}
      resizeMode="cover"
      className="flex-1">
      <BlurView
        style={[StyleSheet.absoluteFill, isAndroid && styles.blur]}
        blurType="light"
        blurRadius={20}
      />
      <View className="min-h-full" style={styles.container}>
        <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
        <TabSwitch items={gridTypes} value={gridType} setValue={setGridType} />
        <ScrollView>
          <DashboardTiles
            counts={counts}
            isColumn={isColumn}
            dashboardItems={dashboardItems}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  blur: {},
  container: {
    flex: 1,
    maxHeight: '80%',
    marginTop: StatusBar.currentHeight ?? 60,
  },
});

export const gridTypes = [
  {value: 'column', icon: 'grid_2'},
  {value: 'row', icon: 'grid'},
];
