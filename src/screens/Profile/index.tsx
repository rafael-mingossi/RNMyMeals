import React from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
import {useAuth} from '@providers';

const Profile = () => {
  const {userLogOut} = useAuth();

  return (
    <SafeAreaView>
      <Text>PROFILE</Text>
      <Pressable
        onPress={async () => {
          userLogOut();
        }}>
        <Text>LOG OUT</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
