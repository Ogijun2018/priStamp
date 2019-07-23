import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import Button from '../components/CategoryButton';
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
