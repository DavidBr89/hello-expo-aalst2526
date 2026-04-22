import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Switch,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef } from "react";
import BasicText from "../components/BasicText";

import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import Axios from "axios";

const types = [
  { id: 1, label: "Ondergronds", value: "underground" },
  { id: 2, label: "Bovengronds", value: "topfloor" },
  { id: 3, label: "Centrum", value: "centre" },
  { id: 4, label: "Carpool", value: "carpool" },
];

interface NewParking {
  id?: number;
  name: string;
  capacity: number;
  isUnderground: boolean;
  electricPlaces: number;
  parkingType: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Naam is verplicht").max(20),
  email: Yup.string()
    .required("Email is verplicht")
    .email("Geen geldig emailadres"),
  capacity: Yup.number()
    .required("Capaciteit is verplicht")
    .positive("Mag niet negatief zijn")
    .max(999, "Moet onder 999 zijn"),
  isUnderground: Yup.boolean().required(),
  password: Yup.string()
    .min(8, "Minstens 8 karakters")
    .required("Wachtwoord is verplicht"),
});

const AddParkingScreen = () => {
  const emailRef = useRef<TextInput>(null);
  const capacityRef = useRef<TextInput>(null);

  const { data, isError, error, isPending, isSuccess, mutate } = useMutation({
    mutationKey: ["addParking"],
    mutationFn: (newParking: NewParking) => {
      return Axios.post<NewParking>(
        "https://jsonplaceholder.typicode.com/posts",
        newParking,
      );
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      capacity: 0,
      isUnderground: false,
      electricPlaces: 10,
      parkingType: types[1].value,
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutate(values);
      // POST request
    },
    validationSchema: validationSchema,
  });

  if (isPending) {
    return <Text>Data wordt verstuurd...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  if (isSuccess) {
    return <Text>{JSON.stringify(data.data)}</Text>;
  }

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-1"
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}>
      <View className="flex-1 bg-white p-4 flex gap-4">
        <BasicText>Naam</BasicText>
        {/* TODO: Custom Text Input component - typing */}
        <TextInput
          className="border rounded-lg px-4 py-2"
          returnKeyType="next"
          autoCorrect={false}
          onSubmitEditing={() => {
            emailRef.current?.focus();
          }}
          submitBehavior="submit"
          value={values.name}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          // keyboardType={Platform.OS === "ios" ? "twitter" : "default"}
        />
        {errors.name && (
          <BasicText className="text-red-600">{errors.name}</BasicText>
        )}

        <BasicText>Email</BasicText>
        <TextInput
          className="border rounded-lg px-4 py-2"
          returnKeyType="next"
          keyboardType="email-address"
          autoCorrect={false}
          autoComplete="email"
          ref={emailRef}
          autoCapitalize="none"
          onSubmitEditing={() => {
            capacityRef.current?.focus();
          }}
          submitBehavior="submit"
          value={values.email}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          // keyboardType={Platform.OS === "ios" ? "twitter" : "default"}
        />
        {errors.email && (
          <BasicText className="text-red-600">{errors.email}</BasicText>
        )}
        <BasicText>Capaciteit</BasicText>
        <TextInput
          ref={capacityRef}
          className="border rounded-lg px-4 py-2"
          returnKeyType="done"
          keyboardType="number-pad"
          value={values.capacity.toString()}
          onChangeText={handleChange("capacity")}
          onBlur={handleBlur("capacity")}
          // keyboardType={Platform.OS === "ios" ? "twitter" : "default"}
        />
        {errors.capacity && (
          <BasicText className="text-red-600">{errors.capacity}</BasicText>
        )}

        <BasicText>Ondergronds</BasicText>
        <Switch
          value={values.isUnderground}
          onValueChange={(value) => {
            setFieldValue("isUnderground", value);
          }}
        />

        <BasicText>Aantal laadplaatsen</BasicText>

        <Slider
          className="grow"
          minimumValue={0}
          maximumValue={100}
          step={5}
          value={values.electricPlaces}
          onValueChange={(value) => {
            setFieldValue("electricPlaces", value);
          }}
        />

        <BasicText>Type parking</BasicText>
        <Picker
          selectedValue={values.parkingType}
          onValueChange={(value) => {
            setFieldValue("parkingType", value);
          }}>
          {types.map((t) => {
            return <Picker.Item key={t.id} label={t.label} value={t.value} />;
          })}
        </Picker>

        <BasicText>Wachtwoord</BasicText>
        <TextInput
          className="border rounded-lg px-4 py-2"
          returnKeyType="done"
          autoCapitalize="none"
          secureTextEntry
          autoCorrect={false}
          autoComplete="new-password"
          value={values.password}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          // keyboardType={Platform.OS === "ios" ? "twitter" : "default"}
        />

        {errors.password && (
          <BasicText className="text-red-600">{errors.password}</BasicText>
        )}

        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          className="bg-green-700 py-2 px-4 rounded-lg">
          <BasicText className="text-center text-white">Verstuur</BasicText>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddParkingScreen;
