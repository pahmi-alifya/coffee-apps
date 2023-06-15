import {Platform} from 'react-native';
import ColorStyle from './Color.style';
import {ColorTone, ColorType} from './Color.types';

const Color = (type: ColorType, tone: ColorTone) => ColorStyle[type][tone];

export const primaryColor = Color('red2', '06');
export const whiteColor = Color('neutral', '01');
export const blackColor = Color('neutral', '10');

export default Color;

/**
 * Use this enum to simply access color theme.
 * Example usage: Theme.Neutral01
 *
 * If you want to give opacity to the color, please add suffix of the opacity
 * to the color string in a hexa format (see: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4)
 * Example: Neutral01o30 = '#FFFFFF4D' --> Neutral01 with 30% opacity
 */
export enum Theme {
  Skobeloff01 = '#E6F1F1',
  Skobeloff02 = '#CCE3E3',
  Skobeloff03 = '#99C7C7',
  Skobeloff04 = '#66ACAC',
  Skobeloff05 = '#339090',
  Skobeloff06 = '#008181',
  Skobeloff07 = '#007474',
  Skobeloff08 = '#006767',
  Skobeloff09 = '#005B5B',
  Skobeloff10 = '#004A4A',

  Red101 = '#FFECE6',
  Red102 = '#FFDACC',
  Red103 = '#FFB599',
  Red104 = '#FF7D4D',
  Red105 = '#FF581A',
  Red106 = '#FF4500',
  Red107 = '#ED4000',
  Red108 = '#D63A00',
  Red109 = '#B83200',
  Red110 = '#9E2B00',

  Red201 = '#FFE7EB',
  Red202 = '#FFC6D1',
  Red203 = '#FF9AAF',
  Red204 = '#FF5578',
  Red205 = '#FF0034',
  Red206 = '#CD042D',
  Red207 = '#B60025',
  Red208 = '#98001F',
  Red209 = '#760018',
  Red210 = '#4D0010',

  Yellow01 = '#FFF8D7',
  Yellow02 = '#FFF5C2',
  Yellow03 = '#FFF1AE',
  Yellow04 = '#FFED93',
  Yellow05 = '#FFE66E',
  Yellow06 = '#FFD600',
  Yellow07 = '#FFC700',
  Yellow08 = '#FFB800',
  Yellow09 = '#FFA800',
  Yellow10 = '#FF9900',

  Green01 = '#EDF7EB',
  Green02 = '#C8E6C3',
  Green03 = '#A4D69B',
  Green04 = '#7FC673',
  Green05 = '#5AB54B',
  Green06 = '#48AD37',
  Green07 = '#419C32',
  Green08 = '#3A8A2C',
  Green09 = '#327927',
  Green10 = '#2B6821',

  Blue01 = '#E6F1F7',
  Blue02 = '#B4D4E8',
  Blue03 = '#83B8D9',
  Blue04 = '#519CCA',
  Blue05 = '#1F7FBB',
  Blue06 = '#0671B3',
  Blue07 = '#0566A1',
  Blue08 = '#055A8F',
  Blue09 = '#044F7D',
  Blue10 = '#03395A',

  Brown01 = '#FAF3E7',
  Brown02 = '#F5E6CE',
  Brown03 = '#F1DAB6',
  Brown04 = '#ECCD9D',
  Brown05 = '#E7C185',
  Brown06 = '#A57950',
  Brown07 = '#996A3E',
  Brown08 = '#805227',
  Brown09 = '#69411B',
  Brown10 = '#54310F',

  SacramentoGreen01 = '#E6F1ED',
  SacramentoGreen02 = '#B3D4C9',
  SacramentoGreen03 = '#80B8A5',
  SacramentoGreen04 = '#4D9B80',
  SacramentoGreen05 = '#1A7E5C',
  SacramentoGreen06 = '#00704A',
  SacramentoGreen07 = '#006543',
  SacramentoGreen08 = '#005A3B',
  SacramentoGreen09 = '#004E34',
  SacramentoGreen10 = '#00432C',

  Electric01 = '#F1E6FF',
  Electric02 = '#E2CCFF',
  Electric03 = '#B780FF',
  Electric04 = '#9A4DFF',
  Electric05 = '#7D1AFF',
  Electric06 = '#6F00FF',
  Electric07 = '#6400E6',
  Electric08 = '#5900CC',
  Electric09 = '#4E00B3',
  Electric10 = '#380080',

  Neutral01 = '#FFFFFF',
  Neutral02 = '#F8F8F9',
  Neutral03 = '#F0F1F3',
  Neutral04 = '#E1E4E7',
  Neutral05 = '#ABB3BD',
  Neutral06 = '#6B7787',
  Neutral07 = '#565F6C',
  Neutral08 = '#404751',
  Neutral09 = '#2B3036',
  Neutral10 = '#15181B',
  Neutral01o20 = '#FFFFFF33',
  Neutral01o30 = '#FFFFFF4D',
  Neutral04o30 = '#E1E4E74D',
  Neutral10o80 = '#15181BCC',

  Gradients01 = '#458BC7',
  Gradients10 = '#35CBCD',

  Gold01 = '#FEFBF0',

  Orange01 = '#FFF1E6',
  Orange06 = '#FF7400',

  Black = '#000000',
  Black50 = '#00000080',

  Transparent = 'transparent',
}

export const Shadow =
  Platform.OS === 'ios'
    ? {
        //shadow ios
        shadowColor: Theme.Neutral10,
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    : {
        //shadow android
        elevation: 5,
      };
