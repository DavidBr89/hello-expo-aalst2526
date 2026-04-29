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
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavProps } from "../../navigators/types";
import BasicText from "../../components/BasicText";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../../config/firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Wachtwoorden komen niet overeen")
    .required(),
});

const RegisterScreen = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );

        sendEmailVerification(userCred.user);

        await updateProfile(userCred.user, {
          displayName: values.name,
        });

        // console.log(user);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });

  const passwordRef = useRef<TextInput>(null);

  const navigation =
    useNavigation<AuthStackNavProps<"register">["navigation"]>();

  return (
    <View className="flex-1 justify-center p-4 gap-4">
      <TextInput
        className="border px-4 py-2 rounded-lg"
        placeholder="Naam"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        value={values.name}
        submitBehavior="submit"
        onSubmitEditing={() => {
          if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
          }
        }}
        returnKeyType="next"
      />
      {errors.name !== null && <BasicText>{errors.name}</BasicText>}

      <TextInput
        className="border px-4 py-2 rounded-lg"
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
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
      {errors.email !== null && <BasicText>{errors.email}</BasicText>}
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
      <TextInput
        className="border px-4 py-2 rounded-lg"
        placeholder="******"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onChangeText={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        value={values.confirmPassword}
        ref={passwordRef}
      />
      {errors.confirmPassword !== null && (
        <BasicText>{errors.confirmPassword}</BasicText>
      )}
      <TouchableOpacity
        className="my-4"
        onPress={() => {
          navigation.replace("login");
        }}>
        <BasicText className="text-right text-sm">Al een account?</BasicText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}
        className="bg-green-700 rounded-lg px-4 py-2">
        <BasicText className="text-white text-center">Registreer</BasicText>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
