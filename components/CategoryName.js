import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { white } from '../components/util';

const CategoryName = ({ category, iconUri }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image style={styles.image} source={iconUri} />
      </View>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: white,
    borderRadius: 50,
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CategoryName;
