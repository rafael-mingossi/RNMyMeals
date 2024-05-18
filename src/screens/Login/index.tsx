import React, {FC, useState, useRef} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {LoginStack} from '@config';
import {supabase} from '@services';

const Login: FC<LoginStack> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<TextInput | null>(null);
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
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        onChangeText={setEmail}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        ref={passwordRef}
        value={password}
        style={styles.input}
        placeholder={'Password'}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={() => signInWithEmail()}
      />

      <TouchableOpacity onPress={signInWithEmail} disabled={loading}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.textButton}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green',
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'blue',
    marginVertical: 10,
  },
});

export default Login;
