import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';

export const useNandiServices = () => {
  const {nandi_service} = useSelector((state: RootState) => state.common);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const deleteItem = (): void => {};
  const onSubmit = (): void => {
    setLoading(true);
    setLoading(false);
  };

  const values = {loading, nandi_service, selectedItems};
  const handlers = {
    setLoading,
    dispatch,
    onSubmit,
    navigation,
    setSelectedItems,
    deleteItem,
  };

  return {...values, ...handlers};
};
