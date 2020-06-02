import React from "react";
import ErrorIcon from "../../../assets/drunk.svg";
import { View, Text } from "react-native";

export default params => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ErrorIcon width={"100%"} height={"25%"} />
      <Text
        style={{
          fontFamily: "AvenirNext-Demi",
          fontSize: 16,
          padding: 24,
          textAlign: "center"
        }}
      >
        {params.message}
      </Text>
    </View>
  );
};
