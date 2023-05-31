import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native';
import Header from './src/Header.js';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import Profile from './src/Profile.js';
import { friendProfiles, myProfile } from './src/data.js';
import Margin from './src/Margin.js';
import Division from './src/Division.js';
import FriendSection from './src/FriendSection.js';
import FriendList from './src/FriendList.js';
import { useState } from 'react';
import TabBar from './src/TabBar.js';

const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();

export default function App() {

  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  };

  const ItemSeparatorComponent = () => <Margin height={13} />
  const renderItem = ({ item }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name}
        introduction={item.introduction}
        isMe={false}
      />
    </View>
  )
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: "white" }}>
      <Header />
      <Margin height={10} />
      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />
      <Margin height={15} />
      <Division />
      <Margin height={12} />
      <FriendSection
        friendProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpened={isOpened}
      />
      <Margin height={5} />
    </View>
  )

  const ListFooterComponent = () => <Margin height={10}/>

  return (
    <View style={styles.container}>

      <FlatList
        data={isOpened ? friendProfiles : []}
        keyExtractor={(_, index) => index}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />

      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
    paddingBottom: bottomSpace,
  },
});
