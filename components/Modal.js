import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  WebView,
} from 'react-native';
import format from 'date-fns/format';
import Locale from 'date-fns/locale/ja';
import { paleGray, opacity, beige, white } from '../components/util';

const { height, width } = Dimensions.get('window');

const today = format(new Date(), 'YYYY年 MMM Do', { locale: Locale });

const CommonModal = ({
  medalData,
  visible,
  animationType,
  onRequestClose,
  category,
  medalCount,
  onRequestTwitter,
}) => {
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      onRequestClose={onRequestClose}
      onRequestTwitter={onRequestTwitter}
    >
      <View style={styles.modalOuterStyle}>
        <View style={styles.displayAreaStyle}>
          {medalCount < 51 || medalData ? (
            <React.Fragment>
              <View style={{ flex: 2 }}>
                <Image
                  resizeMode="contain"
                  style={styles.doneMedal}
                  source={require('../images/mirei_goal.jpg')}
                />
              </View>
              {/* <Image
                style={styles.ribbon}
                source={require('../images/modalRibbon.png')}
              /> */}
              <View style={styles.contents}>
                <Text style={styles.medalCategory}>
                  {category}{'\n'}{medalCount}話を視聴しました！
                </Text>
                {medalData ? (
                  <Text style={styles.today}>{medalData.date}</Text>
                ) : (
                  <Text style={styles.today}>{today}</Text>
                )}
                {/* <Text style={styles.category}>
                  {category}
                </Text> */}
                <TouchableOpacity onPress={onRequestTwitter} style={{marginTop:50}}>
                  <Image
                    resizeMode="contain"
                    style={{width: 200, height: 100}}
                    source={require('../images/twitter.png')}
                    />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={{ flex: 3 }}>
                <Image
                  resizeMode="contain"
                  style={styles.goalImage}
                  source={require('../images/goal.png')}
                />
              </View>
              {/* <Image
                style={styles.ribbon}
                source={require('../images/goalRibbon.png')}
              /> */}
              <View style={styles.contents}>
                <Text style={styles.medalCategory}>よくできました！</Text>
                <Text style={styles.today}>{today}</Text>
                <Text style={styles.category}>
                  {category}メダル10こ あつめたよ！
                </Text>
              </View>
            </React.Fragment>
          )}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
          <Image
            style={styles.closeButtonImage}
            source={require('../images/close.png')}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOuterStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: opacity
  },
  displayAreaStyle: {
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    height: '60%',
  },
  doneMedal: {
    alignItems: 'center',
    marginTop: 50,
    height: height / 5,
  },
  ribbon: {
    flex: 1,
    width: width * 0.9,
    marginTop: 10,
  },
  contents: {
    marginTop: 10,
    flex: 2,
    alignItems: 'center',
  },
  medalCategory: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: '20%',
    right: '12%',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    fontSize: 18,
  },
  category: {
    fontSize: 16,
  },
  goalImage: {
    alignItems: 'center',
    height: height / 3.5,
    marginTop: '5%',
  },
  closeButtonImage: {
    height: 32,
    width: 32,
  },
});

export default CommonModal;
