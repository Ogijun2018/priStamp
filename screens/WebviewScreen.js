import React from 'react';
import { StyleSheet, WebView } from 'react-native';

export default class WebviewScreen extends React.Component {
  title = this.props.navigation.state.params.title;
  url = this.props.navigation.state.params.url;
  render() {
    return <WebView style={styles.webview} source={{ uri: this.url }} />;
  }
}

const styles = StyleSheet.create({
  webview: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
