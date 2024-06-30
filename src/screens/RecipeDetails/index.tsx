import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
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

const RecipeDetails = ({navigation, route}: RecipeDetailsPropsNavigation) => {
  const {
    data: foods,
    isLoading,
    error,
  } = useRecipeDetails(route?.params?.recipeId);

  const data = [
    {value: foods?.tFat!, color: Colours.midOrange},
    {value: foods?.tProtein!, color: Colours.darkYellow},
    {value: foods?.tCarbs!, color: Colours.midGreen},
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    console.log('ERROR LOADING useRecipeDetails API', error);
  }

  return (
    <ScrollView
      scrollEventThrottle={16}
      contentContainerStyle={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/recipe.png')}
          style={styles.banner}
        />
        <Text style={styles.foodName}>{foods?.name}</Text>
      </View>
      <View style={styles.bellowBanner}>
        <View style={styles.singleInfo}>
          <Text style={styles.serving}>
            {foods?.serving} {foods?.serv_unit}
          </Text>
          <Text style={styles.bottomText}>total</Text>
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
          {foods?.recipe_items.length} Ingredients
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
        <Text style={styles.header}>Recipe Macro Nutrients</Text>
        {data && foods ? (
          <MacrosChart
            data={data}
            protein={foods.tProtein}
            carbs={foods.tCarbs}
            fat={foods.tFat}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;
