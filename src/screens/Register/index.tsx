import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RegisterStack} from '@config';

const Register: FC<RegisterStack> = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
