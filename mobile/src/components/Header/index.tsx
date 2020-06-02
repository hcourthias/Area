import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

type HeaderProps = {
  title: string;
  subTitle: string;
  color?: string;
};

export default (params: HeaderProps) => {
  return (
    <View style={[styles.header, { backgroundColor: params.color }]}>
      <Text style={styles.headerTitle}>{params.title}</Text>
      <Text style={styles.headerSubTitle}>{params.subTitle}</Text>
    </View>
  );
};
