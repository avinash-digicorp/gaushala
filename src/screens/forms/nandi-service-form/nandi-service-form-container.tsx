import moment from 'moment';
import {goBack} from 'navigation';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNandiService} from 'store/common/slice';

export const useNandiServiceForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const onSubmit = (values): void => {
    try {
      setLoading(true);
      const id = Date.now();

      dispatch(addNandiService({...values, id}));
      setTimeout(() => {
        setLoading(false);
        goBack();
      }, 3000);
    } catch (e) {
      setLoading(false);
    }
  };

  const initialValues = {
    calf_gender: '',
    cow_identification_marks: '',
    gaay_name_or_number: '',
    nandi_body_color_and_identification: '',
    nandi_name_or_number: '',
    number: '',
    service_given_date: moment(),
    calf_body_color_and_identification: '',
  };
  const values = {loading, initialValues};
  const handlers = {setLoading, onSubmit};

  return {...values, ...handlers};
};
