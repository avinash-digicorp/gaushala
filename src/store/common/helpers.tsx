import {routes} from 'navigation';
import t from 'locales/use-translation';

export const DASHBOARD_ITEMS = [
  {
    listRout: routes.NANDI_SERVICE_LIST,
    formRoute: routes.NANDI_SERVICE_FORM,
    key: 'form_1',
    value: 'nandi_service',
    count: 10,
  },
  {
    listRout: routes.LIVESTOCK_LIST,
    formRoute: routes.LIVESTOCK_FORM,
    key: 'form_2',
    value: 'livestock',
    count: 15,
  },
  {
    listRout: routes.DEATH_LIST,
    formRoute: routes.DEATH_FORM,
    key: 'form_3',
    value: 'death',
    count: 25,
  },
  {
    listRout: routes.BIRTH_LIST,
    formRoute: routes.BIRTH_FORM,
    key: 'form_4',
    value: 'birth',
    count: 10,
  },
  {
    listRout: routes.MILK_PRODUCTION_LIST,
    formRoute: routes.MILK_PRODUCTION_FORM,
    key: 'form_5',
    value: 'milk_production',
    count: 20,
  },
  {
    listRout: routes.FALYA_RECORD_LIST,
    formRoute: routes.FALYA_RECORD_FORM,
    key: 'form_6',
    value: 'falya_record',
    count: 18,
  },
  {
    listRout: routes.ILLNESS_RECORD_LIST,
    formRoute: routes.ILLNESS_RECORD_FORM,
    key: 'form_7',
    value: 'illness_record',
    count: 12,
  },
  {
    listRout: routes.WORM_VACCINATION_LIST,
    formRoute: routes.WORM_VACCINATION_FORM,
    key: 'form_8',
    value: 'worm_vaccination',
    count: 16,
  },
  {
    listRout: routes.LABORATORY_LIST,
    formRoute: routes.LABORATORY_FORM,
    key: 'form_9',
    value: 'laboratory',
    count: 22,
  },
  {
    listRout: routes.VACCINATION_LIST,
    formRoute: routes.VACCINATION_FORM,
    key: 'form_10',
    value: 'vaccination',
    count: 19,
  },
  {
    listRout: routes.BREEDING_LIST,
    formRoute: routes.BREEDING_FORM,
    key: 'form_11',
    value: 'breeding',
    count: 14,
  },
];

export const GenderData = [
  {id: 1, value: 'male', name: t('cow_gender.male')},
  {id: 1, value: 'female', name: t('cow_gender.female')},
  {id: 1, value: 'calf_male', name: t('cow_gender.calf_male')},
  {id: 1, value: 'calf_female', name: t('cow_gender.calf_female')},
];
