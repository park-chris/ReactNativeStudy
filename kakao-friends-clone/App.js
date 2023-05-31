import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Header from './src/Header.js';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Profile from './src/Profile.js';
import {friendProfiles, myProfile} from './src/data.js';
import Margin from './src/Margin.js';
import Division from './src/Division.js';
import FriendSection from './src/FriendSection.js';
import FriendList from './src/FriendList.js';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

export default function App() {


  const onPressArrow = () => {
    console.log('clicked arrow');
  };

  return (
    <View style={styles.container}>
      <Header />

      <Margin height={10} />

      <Profile 
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
      />

      <Margin height={15} />
      <Division /> 
      <Margin height={12} />

      <FriendSection 
        friendProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
      />

      <FriendList style={{backgroundColor:"grey"}}
        data={friendProfiles}
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
    paddingHorizontal: 15,
  },
});
