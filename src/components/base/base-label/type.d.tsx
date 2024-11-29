import {TextProps} from 'react-native';

export interface IProps extends TextProps {
  'label-class'?: string;
  class?: string;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * The component to render elements.
   */
  children?: any;

  /**
   * Title of link component.
   */
  label?: String;

  /**
   * If true, show base button.
   */
  show?: boolean;

  /**
   * Additional props to pass to the button.
   */
  additionalProps?: any;

  withTranslation?: boolean;
}
