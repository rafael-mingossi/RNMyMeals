import React, {FC, useRef, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput as TI,
  Image,
} from 'react-native';
import {TextInput, Snackbar} from 'react-native-paper';
import {ScreenStack} from '@config';
import {supabase} from '@services';
import styles from './register.styles.ts';
import {ButtonRound, ScreenTitle} from '@components';
import {Colours} from '@constants';

const Register: FC<ScreenStack> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealPass, setRevealPass] = useState(true);
  const [visible, setVisible] = useState(false);

  const passwordRef = useRef<TI | null>(null);

  const onDismissSnackBar = () => {
    navigation.navigate('Login');
    setVisible(false);
  };

  async function signUpWithEmail() {
    setLoading(true);
    const {error, data} = await supabase.auth.signUp({email, password});

    if (data.user !== null) {
      // console.log('data =>>>', data);
      // setVisible(true);
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
        <TextInput
          mode="flat"
          // label="E-mail"
          placeholder="E-mail"
          value={email}
          style={styles.input}
          left={<TextInput.Icon icon="email" color={Colours.brown} />}
          keyboardType={'email-address'}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current?.focus()}
          underlineColorAndroid={Colours.brown}
          underlineColor={Colours.brown}
          activeUnderlineColor={Colours.blue}
        />
        <TextInput
          mode="flat"
          // label="Password"
          placeholder="Password"
          value={password}
          style={styles.input}
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
          underlineColorAndroid={Colours.brown}
          underlineColor={Colours.brown}
          activeUnderlineColor={Colours.blue}
        />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'GO!',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        Check your email to validate your account!
      </Snackbar>
      <ButtonRound
        btnColour={'green'}
        onPress={signUpWithEmail}
        disabled={loading || !password || !email}>
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
