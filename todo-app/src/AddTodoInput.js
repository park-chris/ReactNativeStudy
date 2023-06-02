import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { AntDesign } from '@expo/vector-icons';

import { ITEM_WIDTH, bottomSpace } from "./utils";

export default ({
    value,
    onChangeText,
    placeholder,
    onPressAdd,
    onSubmitEditing,
    onFocus
}) => {
    return (
        <View style={{
            width: ITEM_WIDTH,
            flexDirection: "row", 
            alignSelf: "center",
            alignItems: "center" }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={{
                    flex: 1,
                    padding: 5,
                    borderColor:"#595959",
                }}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={false}
                onFocus={onFocus}
            />
            <TouchableOpacity onPress={onPressAdd} style={{padding: 5, backgroundColor:"pink"}}>

            <AntDesign name="plus" size={18} color="#595959" />
            </TouchableOpacity>
        </View>
    )
}