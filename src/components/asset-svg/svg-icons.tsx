import {
  BirthIcon,
  BreedingIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  CrossIcon,
  CrossIcon2,
  DeathIcon,
  EmojiIcon,
  FalyaRecordIcon,
  GridIcon,
  GridIcon2,
  IllnessRecordIcon,
  LaboratoryIcon,
  LeftIcon,
  LivestockIcon,
  LocationIcon,
  LocationIcon2,
  MenuIcon,
  MilkProductionIcon,
  NandiServiceIcon,
  PhoneIcon,
  RightIcon,
  RightIcon2,
  SentIcon,
  VaccinationIcon,
  WormVaccinationIcon,
} from 'assets/svgs';
import {DemoIcon, Icon1, Icon2} from 'assets/svgs/demo';

export const ASSET_SVGS = {
  copy: CopyIcon,
  emoji: EmojiIcon,
  sent: SentIcon,
  phone: PhoneIcon,
  demo: DemoIcon,
  left_arrow: LeftIcon,
  right_arrow: RightIcon,
  right_arrow_2: RightIcon2,
  icon_1: Icon1,
  icon_2: Icon2,
  location: LocationIcon,
  location_2: LocationIcon2,
  check: CheckIcon,
  clock: ClockIcon,
  cross: CrossIcon,
  cross_2: CrossIcon2,
  menu: MenuIcon,

  grid: GridIcon,
  grid_2: GridIcon2,

  nandi_service: NandiServiceIcon,
  livestock: LivestockIcon,
  death: DeathIcon,
  birth: BirthIcon,
  milk_production: MilkProductionIcon,
  falya_record: FalyaRecordIcon,
  illness_record: IllnessRecordIcon,
  worm_vaccination: WormVaccinationIcon,
  laboratory: LaboratoryIcon,
  vaccination: VaccinationIcon,
  breeding: BreedingIcon,
};

export type svgType = keyof typeof ASSET_SVGS;
