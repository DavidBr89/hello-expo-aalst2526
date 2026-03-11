import { View, Text, ViewProps } from "react-native";
import React from "react";

import { twMerge } from "tailwind-merge";

const BasicView = (props: ViewProps) => {
  return (
    <View
      {...props}
      className={twMerge("dark:bg-green-950 bg-white", props.className)}>
      {props.children}
    </View>
  );
};

export default BasicView;
