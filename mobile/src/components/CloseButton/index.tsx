import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import CloseIcon from "../../../assets/close.svg";

export default () => {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity
      style={{ position: "absolute", top: 26, left: 0 }}
      onPress={() => goBack()}
    >
      <CloseIcon width={96} height={28} fill="white" />
    </TouchableOpacity>
  );
};
