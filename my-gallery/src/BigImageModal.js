import { Modal, Pressable, View, Image, TouchableOpacity, LogBox } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons';

const ArrowButton = ({ iconName, onPress, disabled }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{ justifyContent: "center", height: "100%", paddingHorizontal: 20, }}>
            <SimpleLineIcons
                name={iconName}
                size={20}
                color={disabled ? "transparent" : "black" }/>
        </TouchableOpacity>
    )
}

export default ({
    modalVisible,
    onPressBackDrop,
    selectedImage,
    onPressLeftArrow,
    onPressRightArrow,
    showPreviousArrow,
    showNextArrow,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible} >
            <Pressable
                onPress={onPressBackDrop}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgba(0,0,0, 0.5)',
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} disabled={!showPreviousArrow} />

                    <Pressable>
                        <Image
                            source={{ uri: selectedImage?.uri }}
                            style={{ width: 280, height: 280, backgroundColor: "white" }}
                            resizeMode="contain"
                        />
                    </Pressable>

                    <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} disabled={!showNextArrow} />

                </View>

            </Pressable>
        </Modal>
    )
}