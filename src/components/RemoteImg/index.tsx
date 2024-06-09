import {Image, ActivityIndicator} from 'react-native';
import React, {ComponentProps, useEffect, useState} from 'react';
import {supabase} from '@services';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({path, fallback, ...imageProps}: RemoteImageProps) => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!path) return;
    (async () => {
      setIsLoading(true);
      setImage('');
      const {data, error} = await supabase.storage
        .from('food-images')
        .download(path);

      if (error) {
        console.log(error);
        setIsLoading(false);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
          setIsLoading(false);
        };
        setIsLoading(false);
      }
    })();
  }, [path]);

  if (!image) {
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <Image source={{uri: image || fallback}} {...imageProps} />
  );
};

export default RemoteImage;
