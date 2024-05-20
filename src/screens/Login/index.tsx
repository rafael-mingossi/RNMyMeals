import React, {FC, useState, useRef} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput as TI,
} from 'react-native';
import {LoginStack} from '@config';
import {supabase} from '@services';
import {ButtonRound, ScreenTitle, TextInputIcon} from '@components';
import styles from './login.styles.ts';
import {TextInput} from 'react-native-paper';
import {Colours} from '@constants';

const Login: FC<LoginStack> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealPass, setRevealPass] = useState(true);

  const passwordRef = useRef<TI | null>(null);
  async function signInWithEmail() {
    setLoading(true);
    const {error, data} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    if (data) {
      navigation.navigate('Home');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <ScreenTitle title={'Sign in'} />
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
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={revealPass}
          onSubmitEditing={() => signInWithEmail()}
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
        onPress={signInWithEmail}
        disabled={loading}>
        Sign In
      </ButtonRound>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.backToLoginTxt}>No account? Create one!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
