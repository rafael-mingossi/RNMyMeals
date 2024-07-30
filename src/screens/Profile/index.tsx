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
  const [errors, setErrors] = useState({
    dob: false,
    height: false,
    weight: false,
    cal_goal: false,
  });

  const dobRef = useRef<TI | null>(null);
  const sexRef = useRef<TI | null>(null);
  const heightRef = useRef<TI | null>(null);
  const calsRef = useRef<TI | null>(null);
  const weightRef = useRef<TI | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const validateDOB = (value: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!value) {
      return true;
    }
    const match = value.match(regex);
    if (!match) {
      return false;
    }
    const [, day, month, year] = match;
    const date = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
    );
    return (
      date.getDate() === parseInt(day, 10) &&
      date.getMonth() === parseInt(month, 10) - 1 &&
      date.getFullYear() === parseInt(year, 10)
    );
  };

  const formatDOB = (value: string) => {
    if (!value) {
      return value;
    }
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
      4,
      8,
    )}`;
  };

  const validateNumber = (value: string) => {
    return !value || /^\d+$/.test(value);
  };

  const handleTextInput = (name: string, value: string) => {
    let formattedValue: number | string = value;
    let isValid = true;

    if (name === 'dob') {
      formattedValue = formatDOB(value);
      isValid = validateDOB(formattedValue);
    } else if (['height', 'weight', 'cal_goal'].includes(name)) {
      isValid = validateNumber(value);
      formattedValue = isValid ? Number(value) : value;
    }

    setFormData({...formData, [name]: formattedValue});
    setErrors({...errors, [name]: !isValid});
  };

  const handleSave = () => {
    const isValid = Object.values(errors).every(error => !error);
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    const saveData = {...formData};
    if (saveData.dob) {
      const [day, month, year] = saveData.dob.split('/');
      saveData.dob = `${month}/${day}/${year}`;
    }

    updateUserApi(
      {id: formData?.id, userInput: saveData},
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
          <View style={styles.btnWrapper}>
            <Pressable onPress={() => setIsEditing(false)}>
              <Text style={styles.save}>Cancel</Text>
            </Pressable>
            <Text style={styles.btnCancel}>/</Text>
            <Pressable
              onPress={handleSave}
              // style={styles.btnSave}
              disabled={
                isLoading || !Object.values(errors).every(error => !error)
              }>
              <Text style={styles.save}>Save</Text>
            </Pressable>
          </View>
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
                  size={hS(32)}
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
                  size={hS(32)}
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
                  keyboardType={'numeric'}
                  maxLength={10}
                  right={
                    errors.dob ? (
                      <TextInput.Icon
                        icon="alert-circle"
                        color={Colours.midRed}
                      />
                    ) : null
                  }
                />
              ) : (
                <Text style={styles.sectionTxt}>{formData?.dob || 'N/A'}</Text>
              )}
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={hS(32)}
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
                  size={hS(32)}
                  source={'human-male-height'}
                  color={Colours.blue}
                />
                <Text style={styles.iconLabel}>Height</Text>
              </View>
              {isEditing ? (
                <TextInput
                  ref={heightRef}
                  value={formData.height ? String(formData.height) : ''}
                  enterKeyHint={'next'}
                  returnKeyType={'done'}
                  mode={'flat'}
                  style={styles.input}
                  maxLength={3}
                  keyboardType={'numeric'}
                  onChangeText={val => handleTextInput('height', val)}
                  onSubmitEditing={() => {
                    calsRef.current?.focus();
                  }}
                  right={
                    errors.height ? (
                      <TextInput.Icon
                        icon="alert-circle"
                        color={Colours.midRed}
                      />
                    ) : null
                  }
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
                  size={hS(32)}
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
                  onChangeText={val => handleTextInput('cal_goal', val)}
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
                <Icon size={hS(32)} source={'scale'} color={Colours.blue} />
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
                  onChangeText={val => handleTextInput('weight', val)}
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
