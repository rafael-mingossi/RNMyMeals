import {CameraTypes, ImagePickerOptions} from '@types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dispatch, SetStateAction} from 'react';

type cameraUtilsProps = Dispatch<SetStateAction<string | undefined>>;

let options: ImagePickerOptions = {
  storageOptions: {
    skipBackup: true, // Prevent photos from being backed up to iCloud/Google Photos
    path: 'image', // Optional: Custom path for camera photos on Android (external storage permission required)
  },
  mediaType: 'photo' as const,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.5,
};

export const handleCamera = (setSelectedImg: cameraUtilsProps) => {
  launchCamera(options).then((response: CameraTypes) => {
    if (response.didCancel) {
      console.log('User cancelled image selection');
    } else if (response.error) {
      console.error('ImagePicker Error:', response.error);
    } else if (response.error) {
      console.error('ImagePicker Error:', response.error);
    } else {
      response?.assets ? setSelectedImg(response?.assets[0]?.uri) : null;
    }
  });
};

export const handleImagePicker = (setSelectedImg: cameraUtilsProps) => {
  launchImageLibrary(options).then((response: CameraTypes) => {
    if (response.didCancel) {
      console.log('User cancelled image selection');
    } else if (response.error) {
      console.error('ImagePicker Error:', response.error);
    } else {
      response?.assets ? setSelectedImg(response?.assets[0]?.uri) : null;
    }
  });
};
