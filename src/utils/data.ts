import {ImageProps} from 'react-native';

export interface OnboardingData {
  id: number;
  image: ImageProps;
  text: string;
  textColor: string;
  backgroundColor: string;
}

export const data: OnboardingData[] = [
  {
    id: 1,
    image: require('../assets/images/onb_img_3.png'),
    text: 'Access the core functionalities via Add (Plus) button!',
    textColor: '#f8dac2',
    backgroundColor: '#154f40',
  },
  {
    id: 2,
    image: require('../assets/images/onb_img_2.png'),
    text: 'First you add your foods, then add them to your meals!',
    textColor: '#154f40',
    backgroundColor: '#fd94b2',
  },
  {
    id: 3,
    image: require('../assets/images/onb_img_1.png'),
    text: 'You can either scan a barcode or enter details manually!',
    textColor: 'black',
    backgroundColor: '#f8dac2',
  },
];

export default data;
