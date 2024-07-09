// import React from 'react';
// import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {VerticalList} from '../../components/Scroll/VerticalList.tsx';
//
// const RecipeDetails = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//
//   return (
//     <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <VerticalList />
//     </SafeAreaView>
//   );
// };
//
// export default RecipeDetails;

import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RecipeDetailsPropsNavigation} from '@config';
import {useRecipeDetails} from '@api';
import styles from './recipeDetails.styles.ts';
import {Card} from 'react-native-paper';
import {Colours} from '@constants';
import {MacrosChart} from '@components';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const IMG_START_HEIGHT = 600;
const IMG_END_HEIGHT = 180;
const SCROLL_THRESHOLD = 150;

const RecipeDetails = ({navigation, route}: RecipeDetailsPropsNavigation) => {
  const {
    data: foods,
    isLoading,
    error,
  } = useRecipeDetails(route?.params?.recipeId);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const animatedStyles = useAnimatedStyle(() => ({
    height: interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD],
      [IMG_START_HEIGHT, IMG_END_HEIGHT],
    ),
    transform: [
      {
        scale: interpolate(
          scrollOffset.value,
          [-IMG_START_HEIGHT, 0, IMG_START_HEIGHT],
          [2, 1, 1],
        ),
      },
    ],
  }));

  const data = foods && [
    {value: foods?.tFat, color: Colours.midOrange},
    {value: foods?.tProtein, color: Colours.darkYellow},
    {value: foods?.tCarbs, color: Colours.midGreen},
  ];

  if (isLoading) {
    return (
      // PUTTING REF HERE WILL FIX THE Error: Exception in HostFunction: Value is null, expected a number
      <View ref={scrollRef as any} style={styles.loadingView}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    console.log('ERROR LOADING useRecipeDetails API', error);
  }

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      contentContainerStyle={styles.container}>
      <View>
        <Animated.Image
          source={require('../../assets/images/recipe.png')}
          style={[styles.banner, animatedStyles]}
        />
        <Text style={styles.foodName}>{foods?.name}</Text>
      </View>
      <View style={styles.bellowBanner}>
        <View style={styles.singleInfo}>
          <Text style={styles.serving}>
            {foods?.serving} {foods?.serv_unit}
          </Text>
          <Text style={styles.bottomText}>total</Text>
          <Text style={styles.bottomText}>serving</Text>
        </View>
        <View style={styles.singleInfo}>
          <Text style={styles.calories}>{foods?.tCalories}</Text>
          <Text style={styles.bottomText}>calories/</Text>
          <Text style={styles.bottomText}>serving</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.ingredients}>
        <Text style={styles.header}>
          {foods?.recipe_items.length} Ingredient(s)
        </Text>
        {foods?.recipe_items.map(food => (
          <TouchableOpacity key={food.food_id}>
            <Card.Title
              titleStyle={styles.flatListItem}
              subtitleStyle={styles.flatListItem}
              title={food?.foods?.label}
              subtitle={`${food?.foods?.calories} cals`}
              left={() => (
                <Image
                  source={{uri: food?.foods?.food_img!}}
                  style={styles.icon}
                />
              )}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.line} />
      <View style={styles.ingredients}>
        <Text style={styles.header}> Macro Nutrients</Text>
        {data && foods && !isLoading ? (
          <MacrosChart
            data={data}
            protein={foods.tProtein}
            carbs={foods.tCarbs}
            fat={foods.tFat}
          />
        ) : null}
      </View>
    </Animated.ScrollView>
  );
};

export default RecipeDetails;
