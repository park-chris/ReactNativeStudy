import { View, Text, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons';

const headerHeight = 50;

export default ({
    isDropDownOpen,
    selectedAlbum,
    onPressAddAlbum,
    onPressHeader,
    albums,
    onLongPressAlbum,
    onPressAlbum }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPressHeader}
                style={{
                    height: headerHeight,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                <Text style={{ fontWeight: "bold", }}>{selectedAlbum.title}</Text>
                <SimpleLineIcons
                    name={isDropDownOpen ? "arrow-up" : "arrow-down"}
                    size={12}
                    color="black"
                    style={{ marginLeft: 8 }} />
                <TouchableOpacity
                    onPress={onPressAddAlbum}
                    style={{
                        position: "absolute",
                        right: 0,
                        height: headerHeight,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 10,
                    }}>
                    <Text style={{ fontSize: 12 }}>앨범 추가</Text>
                </TouchableOpacity>

            </TouchableOpacity>
            {isDropDownOpen && (
                <View
                    style={{
                        position: "absolute",
                        width: "100%",
                        top: headerHeight,
                        borderTopColor: "lightgrey",
                        borderTopWidth: 0.5,
                        borderBottomColor: "lightgrey",
                        borderBottomWidth: 0.5,
                    }}>
                    {albums.map((album, index) => {
                        const isSelectedAlbum = album.id === selectedAlbum.id
                        return (
                            <TouchableOpacity
                            activeOpacity={1}
                                style={{
                                    paddingVertical: 12,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#FFFFFF"
                                }}
                                onPress={() => onPressAlbum(album)}
                                onLongPress={() => onLongPressAlbum(album.id)}
                                key={`album-${index}`}>
                                <Text style={{ fontWeight: isSelectedAlbum ? "bold" : undefined }}>{album.title}</Text>
                            </TouchableOpacity>
                        )

                    })}
                </View>
            )}
        </View>
    )
}