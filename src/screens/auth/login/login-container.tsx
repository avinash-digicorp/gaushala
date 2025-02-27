import {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {login} from 'store/auth/slice';
import {useToast} from 'components';
import {hasTextLength} from 'utils';
import {navigateTo, routes} from 'navigation';

const useLoginContainer = () => {
  const dispatch = useDispatch();
  const {showToast} = useToast();
  const [mobile, setMobile] = useState<string>('');
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1076961030660-9b8r8q0n0h0h2h2a6q9n1t3r9t2r9u8.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '1076961030660-9b8r8q0n0h0h2h2a6q9n1t3r9t2r9u8.apps.googleusercontent.com',
    });
  }, []);

  const loginSuccess = () => {
    showToast({
      title: 'Login Success',
      autodismiss: true,
    });
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const data = await dispatch(login(userInfo.user));
      await loginSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      if (!hasTextLength(mobile)) {
        showToast({
          title: 'Mobile is required',
          autodismiss: true,
        });
        return;
      }
      const onSuccess = async () => {
        await dispatch(login({mobile}));
        loginSuccess();
      };
      navigateTo(routes.VERIFY_OTP, {mobile, onSuccess});
    } catch (error) {}
  };

  const states = {mobile, setMobile};
  const handlers = {googleSignIn, onSubmit};
  return {
    ...states,
    ...handlers,
  };
};

export default useLoginContainer;
