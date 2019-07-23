import React from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Image,
  Dimensions,
  View,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import WebviewScreen from '../screens/WebviewScreen';
import { initialCategory } from '../components/util';

const { width } = Dimensions.get('window');

const Stack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: (
          <View>
            <StatusBar barStyle="dark-content" />
            <Text>priStamp</Text>
          </View>
        ),
        headerTintColor: 'black',
      }),
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: () => ({
        headerTitle: (
          <View>
            <StatusBar barStyle="dark-content" />
            <View style={styles.containerDetail}>
              <Text>priStamp</Text>
            </View>
          </View>
        ),
        headerTintColor: 'black',
      }),
    },
    Webview: {
      screen: WebviewScreen,
      navigationOptions: () => ({
        headerTitle: (
          <View>
            <StatusBar barStyle="dark-content" />
            <View style={styles.containerDetail}>
              <Text>priStamp</Text>
            </View>
          </View>
        ),
        headerTintColor: 'black',
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(Stack);

export default class AppNavigator extends React.Component {
  state = {
    medals: [],
    categories: [],
  };
  componentDidMount = async () => {
    //ローカルストレージになにも入っていない時のみ初期化する
    if ((await AsyncStorage.getItem('medals')) === null) {
      await AsyncStorage.setItem('medals', JSON.stringify([]));
    }
    if ((await AsyncStorage.getItem('categories')) === null) {
      await AsyncStorage.setItem('categories', JSON.stringify(initialCategory));
    }
    const medals = await AsyncStorage.getItem('medals');
    const categories = await AsyncStorage.getItem('categories');
    this.setState({ medals: JSON.parse(medals) });
    this.setState({ categories: JSON.parse(categories) });
  };

  //stateのmedalsを更新してローカルストレージに保存する
  addMedal = async medal => {
    const medals = this.state.medals.concat(medal);
    this.setState({ medals });
    await AsyncStorage.setItem('medals', JSON.stringify(medals));
  };

  //stateのcategoriesを更新してローカルストレージに保存する
  addNewCategory = async category => {
    const categories = this.state.categories.concat(category);
    this.setState({ categories });
    await AsyncStorage.setItem('categories', JSON.stringify(categories));
  };

  //categoryをローカルストレージから削除し、stateを更新
  removeCategory = async category => {
    try {
      // 一度ストレージのカテゴリをもらってくる
      let categoriesArray = JSON.parse(
        await AsyncStorage.getItem('categories')
      );
      //指定したカテゴリと同じ名前のカテゴリをストレージの配列から削除
      let alteredCategories = categoriesArray.filter(
        originalCategory => originalCategory.value !== category
      );
      //表示用にstateを更新
      this.setState({ categories: alteredCategories });
      await AsyncStorage.setItem(
        'categories',
        JSON.stringify(alteredCategories)
      );

      //指定したカテゴリのバッジ情報をストレージから削除
      let medalsArray = JSON.parse(await AsyncStorage.getItem('medals'));
      let alteredMedals = medalsArray.filter(medal => medal.type !== category);
      //表示用にstateを更新
      this.setState({ medals: alteredMedals });
      await AsyncStorage.setItem('medals', JSON.stringify(alteredMedals));

      return true;
    } catch (exception) {
      return false;
    }
  };

  resetMedal = async category => {
    try {
      let medalsArray = JSON.parse(await AsyncStorage.getItem('medals'));
      let resettedMedals = medalsArray.filter(
        originalMedals => originalMedals.type !== category
      );
      this.setState({ medals: resettedMedals });
      await AsyncStorage.setItem('medals', JSON.stringify(resettedMedals));
    } catch (exception) {
      return false;
    }
  };

  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
        screenProps={{
          medals: this.state.medals,
          categories: this.state.categories,
          addMedal: this.addMedal,
          addNewCategory: this.addNewCategory,
          removeCategory: this.removeCategory,
          resetMedal: this.resetMedal,
        }}
      />
    );
  }
}

const ALIGN = Platform.select({
  ios: 'center',
});

const ABSOLUTE = Platform.select({
  android: width / 6,
});

const styles = StyleSheet.create({
  header: {
    width: width * 0.4,
    resizeMode: 'contain',
  },
  containerDetail: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: ALIGN,
    left: ABSOLUTE,
  },
});
