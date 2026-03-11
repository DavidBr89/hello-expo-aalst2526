import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";
import { twMerge } from "tailwind-merge";

const BasicText = (props: TextProps) => {
  return (
    <Text
      style={styles.txt}
      {...props}
      className={twMerge("dark:text-white", props.className)}>
      {props.children}
    </Text>
  );
};

export default BasicText;

const styles = StyleSheet.create({
  txt: {
    fontFamily: "Delius",
  },
});
