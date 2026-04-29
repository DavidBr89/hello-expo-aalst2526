import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import BasicText from "../../components/BasicText";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../config/firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const emailProp = "email";

const LoginScreen = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormik({
    initialValues: {
      [emailProp]: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          values[emailProp],
          values.password,
        );

        console.log(user);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });

  const passwordRef = useRef<TextInput>(null);

  return (
    <View className="flex-1 justify-center p-4 gap-4">
      <TextInput
        className="border px-4 py-2 rounded-lg"
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange(emailProp)}
        onBlur={handleBlur(emailProp)}
        value={values.email}
        submitBehavior="submit"
        keyboardType="email-address"
        onSubmitEditing={() => {
          if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
          }
        }}
        returnKeyType="next"
      />
      {errors[emailProp] !== null && <BasicText>{errors[emailProp]}</BasicText>}
      <TextInput
        className="border px-4 py-2 rounded-lg"
        placeholder="******"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        value={values.password}
        ref={passwordRef}
      />
      {errors.password !== null && <BasicText>{errors.password}</BasicText>}
      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}
        className="bg-green-700 rounded-lg px-4 py-2">
        <BasicText className="text-white text-center">Login</BasicText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
