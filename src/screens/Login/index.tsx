import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {LoginStack} from '@config';

const Login: FC<LoginStack> = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Bottom</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
