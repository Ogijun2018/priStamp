import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { beige, white, gray } from '../components/util';

const { height, width } = Dimensions.get('window');

const Button = ({ onPress, buttonKind, icon, getMedalCount }) => {
  let remains = 51 - getMedalCount;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <View style={styles.buttonLeftSide}>
          <Text style={styles.category}>{buttonKind}</Text>
            <Image style={styles.categoryImage} source={icon} />
        </View>
        <View style={styles.buttonRightSide}>
          {remains > 0 ? (
            <Text style={styles.remainGoal}>
              現在　第
              <Text style={styles.count}>{getMedalCount}</Text>
              話
            </Text>
          ) : (
            <Text style={styles.goodJob}>ゴールおめでとう！</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  medalImage: {
    width: width * 0.1,
    height: height * 0.05,
    flexWrap: 'wrap',
    resizeMode: 'contain',
    margin: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: white,
    flexDirection: 'row',
    width: width * 0.9,
    height: height * 0.2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: gray,
    margin: 5,
  },
  buttonLeftSide: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: beige,
  },
  categoryImage: {
    marginTop: 10,
    width: width * 0.30,
    height: height * 0.098,
    resizeMode: 'contain',
  },
  buttonRightSide: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remainGoal: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  count: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  goodJob: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default Button;
