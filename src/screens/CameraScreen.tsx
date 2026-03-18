import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

const CameraScreen = () => {
  const [status, requestPermission] = useCameraPermissions();

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
