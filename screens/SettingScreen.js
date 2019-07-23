import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Linking,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { beige, white, gray } from '../components/util';

const { height } = Dimensions.get('window');
const iosAppURL = 'https://itunes.apple.com/jp/app/id1462854067?mt=8';
const androidAppURL = 'datails?id=com.palan.dekita&hl=ja';

const appReviewURL = async () => {
  const reviewUrl =
    Platform.OS === 'ios'
      ? iosAppURL
      : `http://play.google.com/store/apps/${androidAppURL}`;
  try {
    const supported = await Linking.canOpenURL(reviewUrl);
    if (supported) {
      Linking.openURL(reviewUrl);
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
};

export default class SettingScreen extends React.Component {
  state = { webVisible: false };
  constructor(props) {
    super(props);
  }

  list = [
    {
      title: '利用規約',
      key: 'tos',
      url: 'https://twitter.com/intent/tweet?hashtags=pripara',
    },
    {
      title: 'プライバシーポリシー',
      key: 'privacy',
      url: 'https://eishis.com/dekita-privacy/',
    },
    {
      title: 'お問い合わせ',
      key: 'contact',
      url: 'https://eishis.com/dekita-contact/',
    },
    {
      title: 'アプリを評価する',
      key: 'review',
      onPress: () => {
        appReviewURL();
      },
    },
    {
      title: 'アプリの素材について',
      key: 'caution',
      subtitle: 'Icon made by Freepik from www.flaticon.com',
    },
  ];

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>アプリ設定</Text>
        <FlatList
          scrollEnabled={false}
          data={this.list}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <TouchableOpacity
                disabled={item.subtitle && true}
                style={styles.button}
                onPress={
                  item.onPress ? item.onPress : () => navigate('Webview', item)
                }
              >
                <Text style={styles.title}>{item.title}</Text>
                {item.subtitle ? (
                  <Text style={styles.subTitle}>{item.subtitle}</Text>
                ) : (
                  <Icon name="chevron-right" size={13} style={styles.icon} />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: beige,
    paddingLeft: '7%',
    paddingRight: '7%',
    paddingTop: '15%',
  },
  list: {
    borderWidth: 0.5,
    borderColor: gray,
    borderRadius: 5,
    backgroundColor: white,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  button: {
    height: height / 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  subTitle: {
    color: '#A9A9A9',
    paddingLeft: 10,
  },
  icon: {
    position: 'absolute',
    right: '5%',
    color: '#A9A9A9',
  },
});
