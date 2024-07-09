import React, {FC, useRef, useState} from 'react';
import {StatusBar, View, Text, Image} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {ButtonRound} from '@components';
import styles from './initial.styles.ts';
import {ScreenStack} from '@config';

const VideoPlaceholder = () => {
  return (
    <Image
      resizeMode="cover"
      source={require('../../assets/images/intro-image.png')} // Replace with your image path
      style={[styles.backgroundVideo, styles.image]}
    />
  );
};

const VideoPlayer = () => {
  const videoRef = useRef<VideoRef>(null);
  const video = require('../../assets/videos/intro.mp4');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (er: any) => {
    console.error('Video Error:', er);
    setError(true);
  };

  return (
    <>
      {isLoading && !error && <VideoPlaceholder />}
      {error && <VideoPlaceholder />}
      <Video
        resizeMode="cover"
        repeat
        muted
        source={video}
        ref={videoRef}
        onLoad={handleLoad}
        onError={handleError}
        style={styles.backgroundVideo}
      />
    </>
  );
};

const Initial: FC<ScreenStack> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <VideoPlayer />
      <View style={styles.wrapper}>
        <Text style={styles.welcomeTxt}>Welcome to</Text>
        <View style={styles.brandWrapper}>
          <Text style={[styles.welcomeTxt, styles.brandTxtTop]}>My</Text>
          <Text style={[styles.welcomeTxt, styles.brandTxt]}>Meals</Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <ButtonRound
          btnColour={'green'}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Sign in
        </ButtonRound>
        <Text style={styles.txtButtons}>No account? Register now!</Text>
        <ButtonRound
          btnColour={'white'}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Sign up
        </ButtonRound>
      </View>
    </View>
  );
};

export default Initial;
