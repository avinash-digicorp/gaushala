import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {DASHBOARD_ITEMS} from 'store/common/helpers';
import {DashboardItemProps} from 'store/common/types';

export const useHomeContainer = (): IHomeProps => {
  const [loading, setLoading] = useState(false);
  const {nandi_service} = useSelector((state: RootState) => state.common);
  const counts = {
    nandi_service: nandi_service?.length,
  };

  const stats = {dashboardItems: DASHBOARD_ITEMS, counts, loading};
  const handlers = {};
  return {...stats, ...handlers};
};
