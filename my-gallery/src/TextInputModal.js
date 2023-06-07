import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, TextInput, View } from "react-native"

export default ({
    modalVisible,
    albumTitle,
    setAlbumTitle,
    onSubmitEditing,
    onPressBackdrop }) => {
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible} >

                <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>

                    <SafeAreaView style={{
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                    }}>
                        <TextInput
                            placeholder="앨범명을 입력해주세요"
                            style={{ width: "100%", padding: 10, borderColor: "lightgrey", borderWidth: 0.5 }}
                            onChangeText={setAlbumTitle}
                            onSubmitEditing={onSubmitEditing}
                            autoFocus={true}
                            value={albumTitle} />

                    </SafeAreaView>
                </Pressable>

            </Modal>
        </KeyboardAvoidingView>
    )
}