import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const Header = ({ onPress }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.text}>priStamp</Text>
      </View>
      <TouchableOpacity style={styles.buttonRange} onPress={onPress}>
        <Text style={styles.text}>設定</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: width * 0.4,
    resizeMode: 'contain',
  },
  buttonRange: {
    position: 'absolute',
    right: '3%',
    width: '20%',
    height: '110%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default Header;
