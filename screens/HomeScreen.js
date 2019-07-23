import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from '../components/CategoryButton';
import MakeCategoryModal from '../components/MakeCategoryModal';
import { beige } from '../components/util';

export default class HomeScreen extends React.Component {
  state = {
    modalVisible: false,
  };
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  getMedalCount = buttonKind => {
    const medals = this.props.screenProps.medals.filter(
      medal => medal.type === buttonKind
    );
    return medals.length;
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <React.Fragment>
        <ScrollView>
          <View style={styles.container}>
            {this.props.screenProps.categories.map((eachButtonData, index) => {
              let iconData = eachButtonData.uri;
              return (
                <Button
                  key={index}
                  onPress={() => navigate('Detail', eachButtonData)}
                  buttonKind={eachButtonData.value}
                  icon={iconData}
                  getMedalCount={this.getMedalCount(eachButtonData.value)}
                />
              );
            })}
          </View>
          {/* <View style={{ alignItems: 'center', backgroundColor: beige }}>
            <TouchableOpacity
              style={{ padding: 20, marginBottom: 10 }}
              onPress={() => {
                this.openModal();
              }}
            >
              <Image
                style={{ resizeMode: 'contain', width: 50, height: 50 }}
                source={require('../images/plus.png')}
              />
            </TouchableOpacity>
            <MakeCategoryModal
              visible={this.state.modalVisible}
              animationType={'fade'}
              onRequestClose={() => this.closeModal()}
              addNewCategory={this.props.screenProps.addNewCategory}
            />
          </View> */}
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: beige,
    paddingTop: 20,
    paddingBottom: 30,
  },
});
