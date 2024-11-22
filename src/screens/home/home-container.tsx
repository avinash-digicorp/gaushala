import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {DASHBOARD_ITEMS} from 'store/common/helpers';
import {DashboardItemProps} from 'store/common/types';

export const useHomeContainer = (): IHomeProps => {
  const [loading, setLoading] = useState(false);
  const {dashboardItems} = useSelector((state: RootState) => state.common);

  const stats = {dashboardItems: DASHBOARD_ITEMS, loading};
  const handlers = {};
  return {...stats, ...handlers};
};
