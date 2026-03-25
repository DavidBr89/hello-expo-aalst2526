import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

import { saveToLibraryAsync } from "expo-media-library";
import { useMediaLibraryPermissions } from "expo-image-picker";

const CameraScreen = () => {
  const [status, requestPermission] = useCameraPermissions();
  const [mediaStatus, requestMediaPermission] = useMediaLibraryPermissions();

  //   Checken of dat de focus momenteel op dit scherm staat
  const isFocused = useIsFocused();

  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    if (status?.canAskAgain) {
      requestPermission();
    }
  }, [status?.canAskAgain]);

  const cameraRef = useRef<CameraView>(null);

  return (
    <View className="flex-1">
      {isFocused && (
        <CameraView
          onCameraReady={() => {
            setIsCameraReady(true);
          }}
          ref={cameraRef}
          facing="front"
          style={{ flex: 1 }}
        />
      )}
      <TouchableOpacity
        className="my-8 mx-4"
        onPress={async () => {
          if (isCameraReady) {
            try {
              const picture = await cameraRef.current?.takePictureAsync();
              if (picture) {
                if (!mediaStatus?.granted) {
                  await requestMediaPermission();
                }
                await saveToLibraryAsync(picture.uri);
                console.log("Foto is opgeslagen in de galerij");
              }

              console.log(picture);
            } catch (error) {
              console.log(error);
            }
          }
        }}>
        <Text className="text-center font-bold text-3xl">Neem foto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;
