import {StyleSheet} from 'react-native';
import {hS, vS} from '@utils';
import {Colours} from '@constants';

const styles = StyleSheet.create({
  scrollWrapper: {
    paddingHorizontal: hS(15),
    flex: 1,
    backgroundColor: Colours.white,
  },
  imgCameraWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: vS(5),
    marginTop: vS(10),
  },
  cameraImg: {
    width: hS(120),
    height: vS(70),
    borderRadius: 5,
    objectFit: 'contain',
  },
  cameraBtnWrapper: {
    flexDirection: 'column',
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    borderColor: Colours.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: hS(25),
    height: vS(70),
  },
});

export default styles;
