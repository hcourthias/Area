import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

type ActionButtonProps = {
  name: string;
  color?: string;
  index: number;
  onPress: any;
};

export default (params: ActionButtonProps) => {
  return (
    <TouchableOpacity
      index={params.key}
      onPress={() => params.onPress()}
      style={[styles.buttonWrapper, { backgroundColor: params.color }]}
    >
      <Text style={styles.buttonText}>{params.name}</Text>
    </TouchableOpacity>
  );
};
