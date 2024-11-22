import {LocationTypes, WeatherProp} from 'store/common-interface';

export type DashboardItemProps = {
  key: string;
  value: string;
  count: number;
};
export interface IInitialCommonStateProps {
  dashboardItems: DashboardItemProps[];
  location: null | LocationTypes;
  weather: null | WeatherProp;
  unit: 'metric' | 'imperial';
  fetchingWeather: boolean;
  todo: any[];
}
