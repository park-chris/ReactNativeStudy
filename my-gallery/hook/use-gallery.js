
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultAlbum = {
    id: 1,
    title: "기본",
}

const ASYNC_KEY = {
    IMAGES: "images",
    ALBUMS: "albums",
}

export const useGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
    const [albums, setAlbums] = useState([defaultAlbum]);
    const [textInputModalVisible, setTextInputModalVisible] = useState(false);
    const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
    const [albumTitle, setAlbumTitle] = useState("");
    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // {
    //     id: number;
    //     uri: string;
    // }

    const _setImages = (newImages) => {
        setImages(newImages);
        AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
    }

    const _setAlbums = (newAlbums) => {
        setAlbums(newAlbums);
        AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
            const newImage = {
                id: lastId + 1,
                uri: result.assets[0].uri,
                albumId: selectedAlbum.id,
            }
            _setImages([
                ...images,
                newImage
            ]);
        }
    };

    const deleteImage = (imageId) => {
        Alert.alert("이미지를 삭제하시겠습니까?", "", [
            {
                style: "cancel",
                text: "아니오"
            },
            {
                text: "네",
                onPress: () => {
                    const newImages = images.filter(Image => Image.id !== imageId);
                    _setImages(newImages);
                },
            }
        ]);
    };

    const openTextInputModal = () => setTextInputModalVisible(true);
    const closeTextInputModal = () => setTextInputModalVisible(false);
    const openBigImageModal = () => setBigImageModalVisible(true);
    const closeBigImageModal = () => setBigImageModalVisible(false);
    const openDropDown = () => setIsDropdownOpen(true);
    const closeDropDown = () => setIsDropdownOpen(false);

    const addAlbum = () => {
        const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
        const newAlbum = {
            id: lastId + 1,
            title: albumTitle,

        };
        _setAlbums([
            ...albums,
            newAlbum,
        ]);
        setSelectedAlbum(newAlbum);
    };

    const selectAlbum = (album) => {
        setSelectedAlbum(album);
    };

    const deleteAlbum = (albumId) => {
        if (albumId === defaultAlbum.id) {
            Alert.alert("기본 앨범은 삭제할 수 없어요!")
            return;
        }
        Alert.alert("앨범을 삭제하시겠습니까?", "", [
            {
                style: "cancel",
                text: "아니오"
            },
            {
                text: "네",
                onPress: () => {
                    const newAlbums = albums.filter(album => album.id !== albumId);
                    _setAlbums(newAlbums);
                    setSelectedAlbum(defaultAlbum);
                },
            }
        ]);
    }

    const selectImage = (image) => {
        setSelectedImage(image)
    };

    const filteredImages = images.filter((image) => image.albumId === selectedAlbum.id);

    const moveToPrevisouImage = () => {
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
        const previousImageIdx = selectedImageIndex - 1;
        if (previousImageIdx < 0) return;
        const previousImage = filteredImages[previousImageIdx]
        setSelectedImage(previousImage)
    };

    const moveToNextImage = () => {
        const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id);
        const nextImageIdx = selectedImageIndex + 1;
        if (nextImageIdx === -1 || nextImageIdx > filteredImages.length - 1) return;
        const nextImage = filteredImages[nextImageIdx]
        setSelectedImage(nextImage)
    };

    const showPreviousArrow = filteredImages.findIndex(image => image.id === selectedImage?.id )!== 0;
    const showNextArrow = filteredImages.findIndex(image => image.id === selectedImage?.id)  !== filteredImages.length - 1;

    const resetAlbumTitle = () => setAlbumTitle('');

    const imagesWithAddButton = [
        ...filteredImages,
        {
            id: -1,
            uri: "",
        }
    ]

    const initValues = async () => {
        const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
        if (imagesFromStorage !== null) {
            const parsed = JSON.parse(imagesFromStorage);
            setImages(parsed)
            console.log('imagesFromStorag', imagesFromStorage)
        }

        const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
        if (albumsFromStorage !== null) {
            const parsed = JSON.parse(albumsFromStorage);
            setAlbums(parsed)
            console.log('albumsFromStorag', albumsFromStorage)
        }
    }

    useEffect(() => {
        initValues();
    }, []);

    return {
        imagesWithAddButton,
        pickImage,
        deleteImage,
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
    };

};