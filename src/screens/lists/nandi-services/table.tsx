import moment from 'moment';
import React from 'react';
import DataTable, {COL_TYPES} from 'react-native-datatable-component';
import colors from 'theme';
import {SCREEN_WIDTH} from 'utils';

const Table = props => {
  const data = [
    {
      name: 'Muhammad Rafeh',
      age: 21,
      gender: 'male',
      key: '1',
      id: '1',
      isEditable: true,
      isDeletable: true,
      date: moment().toString(),
    },
    {
      name: 'Muhammad Akif',
      age: 22,
      gender: 'male',
      key: '1',
      id: '1',
      isEditable: 'true',
      isDeletable: 'true',
      date: moment().toString(),
    },
    {
      name: 'Muhammad Umar',
      age: 21,
      gender: 'male',
      key: '1',
      id: '1',
      isEditable: true,
      isDeletable: true,
      date: moment().toString(),
    },
    {
      name: 'Amna Shakeel',
      age: 22,
      gender: 'female',
      key: '1',
      id: '1',
      isEditable: true,
      isDeletable: true,
      date: moment().toString(),
    },
    {
      name: 'Muhammad Ammar',
      age: 20,
      gender: 'male',
      key: '1',
      id: '1',
      isEditable: true,
      isDeletable: true,
      date: moment().toString(),
    },
    {
      name: 'Muhammad Moiz',
      age: 13,
      gender: 'male',
      key: '1',
      id: '1',
      isEditable: true,
      isDeletable: true,
      date: moment().toString(),
    },
  ];
  const colSettings = [
    {name: 'name', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
    {name: 'age', type: COL_TYPES.INT, width: SCREEN_WIDTH * 0.2},
    {name: 'gender', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
    {name: 'key', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
    {name: 'id', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
    {name: 'isEditable', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
    {name: 'isDeletable', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
    {name: 'date', type: COL_TYPES.STRING, width: SCREEN_WIDTH * 0.2},
  ];
  const names = [
    'name',
    'age',
    'gender',
    'key',
    'id',
    'isEditable',
    'isDeletable',
    'date',
  ];
  return (
    <DataTable
      data={data}
      colNames={names}
      colSettings={colSettings}
      noOfPages={2}
      backgroundColor={colors.grayLight5}
      headerLabelStyle={{color: colors.gray8, fontSize: 12}} //Text Style Works
    />
  );
};
export default Table;
