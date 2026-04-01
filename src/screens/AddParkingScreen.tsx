import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import BasicText from "../components/BasicText";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

import Axios from "axios";

interface NewParking {
  id?: number;
  name: string;
  capacity: number;
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

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      capacity: 0,
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
  );
};

export default AddParkingScreen;
