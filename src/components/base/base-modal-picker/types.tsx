import {ViewProps} from 'react-native';

export interface BaseModalPickerProps extends ViewProps {
  label?: string;
  placeholder?: string;
  data?: any[];
  value?: any;
  onChange?: (value: any) => void;
  openModal?: () => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}
