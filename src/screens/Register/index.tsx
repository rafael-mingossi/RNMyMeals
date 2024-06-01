import React, {FC, useRef, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput as TI,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RegisterStack} from '@config';
import {supabase} from '@services';
import styles from './register.styles.ts';
import {ButtonRound, ScreenTitle, TextInputIcon} from '@components';
import {Colours} from '@constants';

const Register: FC<RegisterStack> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealPass, setRevealPass] = useState(true);

  const passwordRef = useRef<TI | null>(null);
  async function signUpWithEmail() {
    setLoading(true);
    const {error, data} = await supabase.auth.signUp({email, password});

    if (data) {
      console.log('SUCCESS =>>', data);
      navigation.navigate('Login');
    }

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <ScreenTitle title={'Create Account'} />
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/logoBgWhite.png')}
          style={styles.logo}
        />
        <View style={styles.logoTxtWrapper}>
          <Text style={styles.logoTxt1}>My</Text>
          <Text style={[styles.logoTxt1, styles.logoTxt2]}>Meals</Text>
        </View>
      </View>
      <View>
        <TextInputIcon
          mode="flat"
          label="E-mail"
          value={email}
          left={<TextInput.Icon icon="email" color={Colours.brown} />}
          keyboardType={'email-address'}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInputIcon
          mode="flat"
          label="Password"
          value={password}
          ref={passwordRef}
          secureTextEntry={revealPass}
          onChangeText={setPassword}
          onSubmitEditing={() => signUpWithEmail()}
          right={
            password.length > 0 ? (
              <TextInput.Icon
                icon={!revealPass ? 'eye' : 'eye-off'}
                onPress={() => setRevealPass(!revealPass)}
                color={Colours.brown}
              />
            ) : null
          }
          left={<TextInput.Icon icon="lock" color={Colours.brown} />}
        />
      </View>
      <ButtonRound
        btnColour={'green'}
        onPress={signUpWithEmail}
        disabled={loading}>
        Create
      </ButtonRound>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginTxt}>
          Already have an account? Sign In!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
