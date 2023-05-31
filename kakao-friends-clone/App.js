import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Header from './src/Header.js';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import MyProfile from './src/MyProfile.js';
import {myProfile} from './src/data.js';
import Margin from './src/Margin.js';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

export default function App() {
  return (
    <View style={styles.container}>
      <Header />

      <Margin height={10} />

      <MyProfile 
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
    paddingBottom: bottomSpace,
  },
});
