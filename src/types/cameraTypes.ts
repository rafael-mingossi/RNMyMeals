import {Asset, ErrorCode, PhotoQuality} from 'react-native-image-picker';

export interface ImagePickerOptions {
  title?: string;
  storageOptions: {
    skipBackup: boolean;
    path?: string; // Optional: Custom path for camera photos on Android (external storage permission required)
  };
  allowsEditing: boolean;
  quality: PhotoQuality;
  mediaType: 'photo';
  aspect: [number, number];
}

export type CameraTypes = {
  didCancel?: boolean;
  error?: ErrorCode;
  errorMessage?: string;
  assets?: Asset[];
  uri?: string;
};
