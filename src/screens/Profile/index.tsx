import React, {useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput as TI,
} from 'react-native';
import {useAuth} from '@providers';
import styles from './profile.styles.ts';
import {ButtonText, Surface} from '@components';
import {Colours} from '@constants';
import {Icon, TextInput} from 'react-native-paper';
import {formatNumberWithCommas, hS} from '@utils';
import {InsertTables} from '@types';
import {useUpdateUser} from '@api';

const Profile = () => {
  const {userLogOut, profile} = useAuth();
  const {mutate: updateUserApi} = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<InsertTables<'profiles'>>({
    avatar_url: null,
    cal_goal: profile?.cal_goal,
    dob: profile?.dob,
    full_name: profile?.full_name,
    id: profile?.id!,
    gender: profile?.gender,
    height: profile?.height ? profile?.height : 0,
    username: null,
    weight: profile?.weight ? profile?.weight : 0,
  });

  const dobRef = useRef<TI | null>(null);
  const sexRef = useRef<TI | null>(null);
  const heightRef = useRef<TI | null>(null);
  const calsRef = useRef<TI | null>(null);
  const weightRef = useRef<TI | null>(null);

  const handleTextInput = (name: string, value: string | number) => {
    setFormData({...formData, [name]: value});
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsLoading(true);
    updateUserApi(
      {id: formData?.id, userInput: formData},
      {
        onSuccess: () => {
          setIsEditing(false);
          setIsLoading(false);
        },
        onError: err => {
          console.log('ERROR UPDATING THE USER ===>>>', err);
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colours.green} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        {isEditing ? (
          <Pressable
            onPress={handleSave}
            style={styles.btnSave}
            disabled={isLoading}>
            <Text style={styles.save}>Save</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleEdit}
            style={styles.btnSave}
            disabled={isLoading}>
            <Text style={styles.save}>Edit</Text>
          </Pressable>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <Surface>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.sectionWrapper}>
            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={hS(28)}
                  source={'label-outline'}
                  color={Colours.blue}
                />
                <Text style={styles.iconLabel}>Name</Text>
              </View>
              {isEditing ? (
                <TextInput
                  value={formData.full_name!}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  onChangeText={val => handleTextInput('full_name', val)}
                  onSubmitEditing={() => {
                    dobRef.current?.focus();
                  }}
                />
              ) : (
                <Text style={styles.sectionTxt}>
                  {formData?.full_name || 'N/A'}
                </Text>
              )}
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={hS(28)}
                  source={'cake-variant-outline'}
                  color={Colours.blue}
                />
                <Text style={styles.iconLabel}>Dob</Text>
              </View>
              {isEditing ? (
                <TextInput
                  ref={dobRef}
                  value={formData.dob!}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  onChangeText={val => handleTextInput('dob', val)}
                  onSubmitEditing={() => {
                    sexRef.current?.focus();
                  }}
                />
              ) : (
                <Text style={styles.sectionTxt}>{formData?.dob || 'N/A'}</Text>
              )}
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={hS(28)}
                  source={'gender-male-female'}
                  color={Colours.blue}
                />
                <Text style={styles.iconLabel}>Sex</Text>
              </View>
              {isEditing ? (
                <TextInput
                  ref={sexRef}
                  value={formData.gender!}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  onChangeText={val => handleTextInput('gender', val)}
                  onSubmitEditing={() => {
                    heightRef.current?.focus();
                  }}
                />
              ) : (
                <Text style={styles.sectionTxt}>
                  {formData?.gender || 'N/A'}
                </Text>
              )}
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={hS(28)}
                  source={'human-male-height'}
                  color={Colours.blue}
                />
                <Text style={styles.iconLabel}>Height</Text>
              </View>
              {isEditing ? (
                <TextInput
                  ref={heightRef}
                  value={String(formData.height)}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  onChangeText={val => handleTextInput('height', Number(val))}
                  onSubmitEditing={() => {
                    calsRef.current?.focus();
                  }}
                />
              ) : (
                <Text style={styles.sectionTxt}>
                  {formData?.height || 'N/A'}
                </Text>
              )}
            </View>
          </View>
        </Surface>
        <Surface>
          <Text style={styles.sectionTitle}>Personal Goals</Text>
          <View style={styles.sectionWrapper}>
            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={hS(28)}
                  source={'food-apple-outline'}
                  color={Colours.blue}
                />
                <Text style={styles.iconLabel}>Daily Calories</Text>
              </View>
              {isEditing ? (
                <TextInput
                  ref={calsRef}
                  value={String(formData.cal_goal)}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  onChangeText={val => handleTextInput('cal_goal', Number(val))}
                  onSubmitEditing={() => {
                    weightRef.current?.focus();
                  }}
                />
              ) : (
                <Text style={styles.sectionTxt}>
                  {formatNumberWithCommas(Number(formData.cal_goal)) || 'N/A'}
                </Text>
              )}
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon size={hS(28)} source={'scale'} color={Colours.blue} />
                <Text style={styles.iconLabel}>Body Weight</Text>
              </View>
              {isEditing ? (
                <TextInput
                  ref={weightRef}
                  value={String(formData.weight)}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  onChangeText={val => handleTextInput('weight', Number(val))}
                  onSubmitEditing={handleSave}
                />
              ) : (
                <Text style={styles.sectionTxt}>
                  {formData?.weight || 'N/A'}
                </Text>
              )}
            </View>
          </View>
        </Surface>
        <ButtonText
          labelStyles={styles.btn}
          children={'LOG OUT'}
          onPress={async () => {
            userLogOut();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
