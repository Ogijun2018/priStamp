import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import CategoryName from '../components/CategoryName';
import MedalList from '../components/MedalList';
import CommonModal from '../components/Modal';
import format from 'date-fns/format';
import Locale from 'date-fns/locale/ja';
import { beige, white } from '../components/util';

const { height, width } = Dimensions.get('window');
const today = format(new Date(), 'YYYY-MM-DD', { locale: Locale });

export default class DetailScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  Triangle() {
    return <View style={[styles.triangle]} />;
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  dekitaPress = async (category, medalCount) => {
    this.props.screenProps.addMedal({
      type: category,
      date: today,
    });
    //this.props.screenProps.medalsで現在のメダルの配列が参照できる
  };

  onPressTwitterButton = (kind, storyCount) => {
    const { navigate } = this.props.navigation;
    let Url;
    if(kind === 'プリティーリズム オーロラドリーム' || kind === 'プリティーリズム ディアマイフューチャー' || kind === 'プリティーリズム レインボーライブ'){
      Url = 'https://twitter.com/intent/tweet?hashtags=prettyrhythm,prickathon';
    }else if(kind === 'プリパラ season.1' || kind === 'プリパラ season.2' || kind === 'プリパラ season.3' || kind === 'アイドルタイムプリパラ'){
      Url = 'https://twitter.com/intent/tweet?hashtags=pripara,prickathon';
    }else{
      Url = 'https://twitter.com/intent/tweet?hashtags=prichan,prickathon';
    }
    console.log(Url);
    this.setState({modalVisible: false});
    navigate('Webview', {
      title: 'twitter',
      key: 'twitter',
      url: Url + '&text=' + kind + ' '+ storyCount + '話を見たぷり！',
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    let category = this.props.navigation.state.params.value;
    //medalsにそれぞれのカテゴリのtypeだけが入った配列を作る
    let medals;
    if (this.props.screenProps.medals !== null) {
      medals = this.props.screenProps.medals.filter(
        medal => medal.type === category
      );
    }

    // let Triangles = [];
    // for (let i = 0; i < 15; i++) {
    //   Triangles.push(<View key={i} style={[styles.triangle]} />);
    // }

    // let TrianglesReverse = [];
    // for (let i = 0; i < 15; i++) {
    //   TrianglesReverse.push(
    //     <View
    //       key={i + 15}
    //       style={[styles.triangle, { transform: [{ rotate: '180deg' }] }]}
    //     />
    //   );
    // }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CategoryName
            category={category}
            iconUri={this.props.navigation.state.params.uri}
          />
          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                Alert.alert(
                  'Warning!',
                  'メダルをリセットします.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        this.props.screenProps.resetMedal(category);
                        navigate('Home');
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Image
                style={styles.resetButtonImage}
                source={require('../images/resetButton.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.button}>
            <React.Fragment>
              {/*できた！ボタン部分*/}
              {medals.length < 51 ? (
                <TouchableOpacity
                  onPress={() => {
                    {
                      this.dekitaPress(category, medals.length);
                      this.openModal();
                    }
                  }}
                >
                  <Image
                    style={styles.dekitaButton}
                    source={require('../images/kirachike.png')}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  style={styles.dekitaButtonOpacity}
                  source={require('../images/kirachike.png')}
                />
              )}
              {/*モーダル部分*/}
              <CommonModal
                visible={this.state.modalVisible}
                animationType={'fade'}
                onRequestClose={() => this.closeModal()}
                category={category}
                medalCount={medals.length}
                onRequestTwitter={() => this.onPressTwitterButton(category, medals.length)}
              />
            </React.Fragment>
          </View>
          <View style={styles.bottom}>
            {/* <View style={styles.trianglesRow}>{Triangles}</View> */}
            <View style={styles.medalList}>
              <Text style={styles.text}>
                {medals.length < 51 ? (
                  <React.Fragment>
                    <Text>
                      現在 {medals.length} 話！
                      最終回まであと
                      <Text style={styles.medalCount}>
                        {51 - medals.length}
                      </Text>
                      話！
                    </Text>
                  </React.Fragment>
                ) : (
                  <Text>
                    おめでとう！
                    最終回！！
                  </Text>
                )}
              </Text>
              {/*ここでMedalListに配列を渡す*/}
              <ScrollView>
                <MedalList medalData={medals} category={category} onPressTwitterButton={() => this.onPressTwitterButton(category, medals.length)}/>
              </ScrollView>
            </View>
            {/* <View style={styles.trianglesRow}>{TrianglesReverse}</View> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: width / 20,
    paddingRight: width / 20,
    backgroundColor: beige,
  },
  header: {
    flex: 1.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  resetButton: {
    height: height / 17,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  resetButtonImage: {
    resizeMode: 'contain',
    width: width / 5,
  },
  body: {
    flex: 10,
    alignItems: 'center',
  },
  button: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dekitaButton: {
    width: width / 1.5,
    height: height / 4,
  },
  dekitaButtonOpacity: {
    width: width / 1.5,
    height: height / 4,
    opacity: 0.3,
  },
  trianglesRow: {
    flexDirection: 'row',
  },
  medalList: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    width: width,
    height: height / 2.5,
  },
  medalCount: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width / 30,
    borderRightWidth: width / 30,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});
