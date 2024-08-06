import React, {FC, useState, useRef} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput as TI,
} from 'react-native';
import {ScreenStack} from '@config';
import {supabase} from '@services';
import {ButtonRound, ScreenTitle} from '@components';
import styles from './login.styles.ts';
import {TextInput} from 'react-native-paper';
import {Colours} from '@constants';
import {useAuth} from '@providers';

const Login: FC<ScreenStack> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealPass, setRevealPass] = useState(true);

  const passwordRef = useRef<TI | null>(null);
  const {session} = useAuth();

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
      session && navigation.navigate('Home');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <ScreenTitle title={'Sign in'} />
      <View>
        <TextInput
          mode="flat"
          // label="E-mail"
          placeholder="E-mail"
          value={email}
          left={<TextInput.Icon icon="email" color={Colours.brown} />}
          keyboardType={'email-address'}
          style={styles.input}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordRef.current?.focus()}
          underlineColorAndroid={Colours.brown}
          underlineColor={Colours.brown}
          activeUnderlineColor={Colours.blue}
        />
        <TextInput
          mode="flat"
          placeholder="Password"
          // label="Password"
          ref={passwordRef}
          value={password}
          style={styles.input}
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
          underlineColorAndroid={Colours.brown}
          underlineColor={Colours.brown}
          activeUnderlineColor={Colours.blue}
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
