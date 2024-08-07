import {StyleSheet} from 'react-native';
import {hS, vS, mS} from '@utils';
import {Colours, Fonts} from '@constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: vS(15),

    backgroundColor: Colours.white,
    flex: 1,
  },
  scrollWrapper: {
    paddingHorizontal: hS(15),
  },
  subLabel: {
    fontSize: mS(12),
    marginLeft: hS(10),
    marginTop: vS(5),
    color: Colours.gray,
    marginBottom: vS(10),
    fontFamily: Fonts.regular,
  },
  modalText: {
    fontFamily: Fonts.regular,
    fontSize: mS(16),
    color: Colours.black,
  },
  closeModalBtn: {
    marginTop: vS(15),
    marginLeft: 'auto',
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
  imgLabel: {
    fontSize: mS(14),
    fontFamily: Fonts.medium,
    marginBottom: vS(10),
    marginTop: vS(15),
  },
  imgLabelScan: {
    fontSize: mS(14),
    fontFamily: Fonts.medium,
    marginBottom: vS(10),
    paddingHorizontal: hS(15),
  },
  buttonScan: {
    fontSize: mS(20),
  },
  imgCameraWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: vS(15),
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
});

export default styles;
