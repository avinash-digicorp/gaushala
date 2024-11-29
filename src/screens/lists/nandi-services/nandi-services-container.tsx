import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

export const useNandiServices = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const onSubmit = (): void => {
      setLoading(true);
      setLoading(false);
    };

    const values = {loading};
    const handlers = {setLoading, dispatch, onSubmit, navigation};

    return {...values, ...handlers};
   }
