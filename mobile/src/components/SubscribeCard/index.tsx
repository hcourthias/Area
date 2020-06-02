import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { observer, inject } from "mobx-react";
import { db } from "../../providers/firebase";
import { toJS } from "mobx";
import { useNavigation } from "react-navigation-hooks";

export type SubscribeCard = {
  action: string;
  reaction: string;
  email: string;
  onPress: any;
};

function SubscribeCard(params) {
  const { subscribe, setSubscribe, deleteSubscribe } = params.store;

  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate("SubscribeDetails", { ServiceInfo: params })}
      style={{
        backgroundColor: "black",
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 24,
        borderRadius: 10
      }}
    >
      <Text
        style={{
          color: "white",
          fontFamily: "AvenirNext-Bold",
          fontSize: 28
        }}
      >
        {`If ${params.action}, then ${params.reaction}`}
      </Text>
      <Text
        style={{
          color: "white",
          fontFamily: "AvenirNext-Demi",
          fontSize: 16,
          marginTop: 16
        }}
      >
        {`by ${params.email}`}
      </Text>
    </TouchableOpacity>
  );
}

export default inject("store")(observer(SubscribeCard));
