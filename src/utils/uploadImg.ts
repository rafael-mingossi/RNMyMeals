import * as RNFS from '@dr.pogodin/react-native-fs';
import {decode} from 'base64-arraybuffer';
import {supabase} from '@services';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const uploadImage = async (image: string) => {
  if (!image?.startsWith('file://')) {
    return;
  }

  try {
    // Read image as base64 encoded string
    const base64Data = await RNFS.readFile(image, 'base64');

    // Decode base64 to ArrayBuffer (required for Supabase upload)
    const arrayBuffer = decode(base64Data);
    // Generate unique file name
    const filePath = `${uuidv4()}.png`;
    const contentType = 'image/png';

    // Upload image to Supabase storage
    const {data, error} = await supabase.storage
      .from('food-images')
      .upload(filePath, arrayBuffer, {contentType});

    if (data) {
      return data.path; // Return uploaded image path
    } else {
      console.error('Error uploading image:', error);
      return null; // Handle upload error (optional)
    }
  } catch (err) {
    console.error('Error reading or uploading image:', err);
    return null; // Handle general error (optional)
  }
};
