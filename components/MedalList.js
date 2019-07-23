import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { width } = Dimensions.get('window');
import CommonModal from './Modal';

export default class Medal extends React.Component {
  state = {
    selectedMedal: null,
    storyCount: null,
  };

  openModal(medal, index) {
    this.setState({ selectedMedal: medal, storyCount: index+1 });
  }

  closeModal() {
    this.setState({ selectedMedal: null });
  }

  //TODO: 未完成
  onPressTwitterButton = (kind, storyCount) => {
    const { navigate } = this.props.navigation;
    this.closeModal();
    let Url;
    if(kind === 'プリティーリズム オーロラドリーム' || kind === 'プリティーリズム ディアマイフューチャー' || kind === 'プリティーリズム レインボーライブ'){
      Url = 'https://twitter.com/intent/tweet?hashtags=prettyrhythm';
    }else if(kind === 'プリパラ season.1' || kind === 'プリパラ season.2' || kind === 'プリパラ season.3' || kind === 'アイドルタイムプリパラ'){
      Url = 'https://twitter.com/intent/tweet?hashtags=pripara';
    }else{
      Url = 'https://twitter.com/intent/tweet?hashtags=prichan';
    }
    navigate('Webview', {
      title: 'twitter',
      key: 'twitter',
      url: Url + '&text=' + kind + ' '+ storyCount + '話を見ました！',
    });
  };

  renderRemainsMedal = () => {
    let remainsMedal = [];
    let remains;
    if (this.props.medalData !== (null || undefined)) {
      remains = 51 - this.props.medalData.length;
    } else {
      throw new Error('medalData are null or undefined.');
    }
    for (let i = 0; i < remains; i++) {
      remainsMedal.push(
        <Image
          key={i}
          style={styles.image}
          source={require('../images/medalEmpty.png')}
        />
      );
    }
    return remainsMedal;
  };

  render() {
    let number;
    return (
      <View style={styles.list}>
        {this.props.medalData !== undefined &&
          this.props.medalData.map((medal, index) => {
            return (
              <React.Fragment key={index}>
                <TouchableOpacity onPress={() => this.openModal(medal,index)}>
                  <Image
                    style={styles.image}
                    source={require('../images/Kiracchu.png')}
                  />
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        {this.renderRemainsMedal()}
        {/*メダルの中のモーダル*/}
        <CommonModal
          medalData={this.state.selectedMedal}
          visible={this.state.selectedMedal !== null}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
          medalCount={this.state.storyCount}
          category={this.props.category}
          onRequestTwitter={this.props.onPressTwitterButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: width / 6,
    width: width / 6,
    marginBottom: 10,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
});
