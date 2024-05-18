import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const vS = (val: number) => {
  return verticalScale(val);
};

export const hS = (val: number) => {
  return scale(val);
};

export const mS = (val: number, factor?: number) => {
  return moderateScale(val, factor);
};
