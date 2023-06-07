import { Alert, Button, Dimensions, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGallery } from './hook/use-gallery';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';
import BigImageModal from './src/BigImageModal';
import ImageList from './src/ImageList';

export default function App() {

  const {
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropDownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImageModalVisible,
    openBigImageModal,
    closeBigImageModal,
    selectImage,
    selectedImage,
    moveToPrevisouImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  }
  const onLongPressImage = (imageId) => { deleteImage(imageId); }
  const onPressAddAlbum = () => {
    openTextInputModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;
    // 1. 앨범에 타이틀 추가
    addAlbum();
    // 2. 모달 닫기 & TextInput의 value 초기화
    closeTextInputModal();
    resetAlbumTitle();
  };

  const onPressTextInputBackdrop = () => {
    closeTextInputModal();
  };

  const onPressHeader = () => {
    if (isDropDownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  };

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal(true);
  };

  const onPressImageBackDrop = () => {
    closeBigImageModal();
  };

  const onPressLeftArrow = () => {
    moveToPrevisouImage();
  };
  const onPressRightArrow = () => {
    moveToNextImage();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 앨범 DropDown, 앨범 추가 버튼 */}
      <MyDropDownPicker
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        isDropDownOpen={isDropDownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      {/* 앨범을 추가하는 TextInpuModel */}
      <TextInputModal
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputBackdrop}
      />

      {/* 이미지를 크게 보는 Modal */}
      <BigImageModal
        modalVisible={bigImageModalVisible}
        onPressBackDrop={onPressImageBackDrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
      />

      {/* 이미지 리스트 */}
      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressImage={onPressImage}
        onLongPressImage={onLongPressImage}
        onPressOpenGallery={onPressOpenGallery}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
});
