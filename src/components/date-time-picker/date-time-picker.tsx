import React, {useState} from 'react';
import {BaseLabel, ButtonView, Text} from 'components';
import {StyleSheet, View} from 'react-native';
import Picker from '@react-native-community/datetimepicker';
import {isIosPlatform} from 'utils';
import moment from 'moment';
import colors from 'theme';
import {DateType} from 'store/common-interface';
import {LocalizationKeys} from 'locales/use-translation';

interface IDateTimePickerProps {
  mode?: 'date' | 'time';
  placeholder?: string;
  date: DateType;
  onChange: (selectedDate: DateType | any) => void;
  label: LocalizationKeys | string;
}

export const DateTimePicker = (props: IDateTimePickerProps) => {
  const ref = React.createRef<any>();
  const {mode, date, onChange} = props;
  const [show, setShow] = useState<boolean>(false);

  const onChangeValue = (event: any, selectedDate: any) => {
    try {
      setShow(false);
      const currentDate = moment(selectedDate);
      onChange(currentDate);
      return true;
    } catch (error) {}
  };

  const dateString =
    mode === 'time'
      ? moment(date).format('HH:mm A')
      : moment(date).format('DD MMM YYYY');
  return (
    <View
      className="items-center justify-between w-full flex-row"
      style={styles.container}>
      <BaseLabel {...props} class="mb-0" />
      <ButtonView
        hide={isIosPlatform}
        onPress={() => setShow(true)}
        className="bg-gray-100 py-2 px-2 rounded-md items-center justify-center">
        <Text className="text-lg text-center" text={dateString} />
      </ButtonView>
      {(show || isIosPlatform) && (
        <Picker
          ref={ref}
          value={date.toDate()}
          mode={mode}
          collapsable
          shouldRasterizeIOS
          onChange={onChangeValue}
          textColor="#12ee41"
          accentColor={colors.primary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
});
DateTimePicker.defaultProps = {
  mode: 'date',
  date: moment(),
  onChange: () => {},
};
