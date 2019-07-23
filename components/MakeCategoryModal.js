import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import { category, gray, paleGray, opacity, beige } from './util';

const { width } = Dimensions.get('window');

export default class newCategoryModal extends React.Component {
  constructor() {
    super();
    this.state = {
      inputCategory: '',
      pressIcon: false,
      selectIcon: '',
    };
  }

  _handleTextChange = inputCategory => {
    this.setState({ inputCategory });
  };

  _onPressButton = () => {
    if (this.state.inputCategory === '') {
      Alert.alert('なまえをいれてください');
      return false;
    }
    if (this.state.selectIcon === '') {
      Alert.alert('アイコンをえらんでください');
      return false;
    }
    this.props.addNewCategory({
      value: this.state.inputCategory,
      uri: this.state.selectIcon,
    });
    Alert.alert('追加しました');
    this.setState({ inputCategory: '', selectIcon: '', pressIcon: false });
  };

  onPressCategoryIcon = index => {
    this.setState({ pressIcon: true, selectIcon: index + 1 });
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={this.props.animationType}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.modalOuterStyle}>
          <View style={styles.displayAreaStyle}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.onRequestClose}
            >
              <Image
                style={styles.closeButtonImage}
                source={require('../images/close.png')}
              />
            </TouchableOpacity>
            <View style={styles.text}>
              <Text style={styles.innertext}>
                あたらしいカテゴリを追加します
              </Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="なまえをいれてね"
              onChangeText={this._handleTextChange}
            />
            <View style={styles.text}>
              <Text style={styles.innertext}>
                カテゴリのアイコンをえらんでね
              </Text>
            </View>
            <View style={styles.iconSelectArea}>
              <ScrollView>
                <View style={styles.scrollView}>
                  {category.map((eachIconImage, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => this.onPressCategoryIcon(index)}
                        style={
                          //indexは0からスタートするので+1して画像のrequireと合わせる
                          this.state.pressIcon === true &&
                          index + 1 === this.state.selectIcon
                            ? styles.iconPressed
                            : styles.icon
                        }
                      >
                        <Image
                          style={{
                            resizeMode: 'contain',
                            width: 50,
                            height: 50,
                            margin: 20,
                          }}
                          source={eachIconImage}
                          key={index}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={this._onPressButton}
              //TODO: カテゴリを追加した後にnavigateでHomeに戻りたい
              navigate={() => navigate('Home')}
            >
              <Image
                style={styles.okButton}
                source={require('../images/okButton.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOuterStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: opacity,
  },
  displayAreaStyle: {
    backgroundColor: paleGray,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    height: '60%',
  },
  closeButton: {
    top: '1%',
    left: '40%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
  },
  text: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innertext: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textInput: {
    flex: 0.5,
    fontSize: 20,
    borderWidth: 2,
    borderColor: gray,
    borderRadius: 10,
    width: width * 0.7,
    textAlign: 'center',
  },
  iconSelectArea: {
    flex: 3,
  },
  iconPressed: {
    borderWidth: 2,
    borderColor: gray,
    borderRadius: 100,
    backgroundColor: beige,
    margin: 3,
  },
  icon: {
    margin: 5,
  },
  okButton: {
    resizeMode: 'contain',
    width: width * 0.25,
    height: width * 0.2,
  },
  submit: {
    flex: 1.0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonImage: {
    height: 32,
    width: 32,
  },
});
