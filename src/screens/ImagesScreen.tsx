import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";

import ImagePicker, {
  ImagePickerResult,
  launchImageLibraryAsync,
} from "expo-image-picker";
import BasicText from "../components/BasicText";

const ImagesScreen = () => {
  const [photos, setPhotos] = useState<ImagePickerResult | null>(null);

  return (
    <View>
      <Text>ImagesScreen</Text>
      <TouchableOpacity
        className="bg-green-700 px-4 py-2 mx-8"
        onPress={async () => {
          try {
            const result = await launchImageLibraryAsync({
              allowsMultipleSelection: true,
              exif: true,
              //   allowsEditing: true,
            });

            setPhotos(result);
          } catch (error) {
            console.log(error);
          }
        }}>
        <BasicText className="text-white text-center">Foto</BasicText>
      </TouchableOpacity>
      {photos !== null && !photos.canceled && (
        <FlatList
          //   numColumns={2}
          horizontal
          data={photos.assets}
          renderItem={({ item }) => (
            <Image width={200} height={200} source={{ uri: item.uri }} />
          )}
          keyExtractor={(item) => item.uri}
        />
      )}
    </View>
  );
};

export default ImagesScreen;
