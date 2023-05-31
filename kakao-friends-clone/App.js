import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import Header from './src/Header.js';

import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

console.log(`${Platform.OS} : ${statusBarHeight}, ${bottomSpace}`)

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
    paddingBottom: bottomSpace,
    // justifyContent: "flex-end",
  },
});
