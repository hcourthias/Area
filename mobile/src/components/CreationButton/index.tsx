import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { observer, inject } from "mobx-react";

function CreationButton(props) {
  const { navigate } = useNavigation();
  const { action, reaction } = props.store;

  if (!action && props.index === 1)
    return (
      <TouchableOpacity
        onPress={() => navigate("ServiceSelector", { type: "action" })}
      >
        <View style={styles.thisButtonWrapper}>
          <FontAwesome name="plus-square" size={56} />
          <Text style={[styles.body, { opacity: 0.4, marginLeft: 8 }]}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  if (action && props.index === 1) {
    return (
      <TouchableOpacity
        onPress={() => navigate("ServiceSelector", { type: "action" })}
        style={{
          width: 62,
          height: 62,
          backgroundColor: action.color,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{ width: 42, height: 42 }}
          source={{ uri: action.image }}
        />
      </TouchableOpacity>
    );
  }
  if (action && !reaction && props.index === 2) {
    return (
      <TouchableOpacity
        onPress={() => navigate("ServiceSelector", { type: "reaction" })}
      >
        <View style={styles.thisButtonWrapper}>
          <FontAwesome name="plus-square" size={56} />
          <Text style={[styles.body, { opacity: 0.4, marginLeft: 8 }]}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  if (!action && props.index === 2) {
    return <Text style={styles.body}>{props.title}</Text>;
  }

  if (reaction && props.index === 2) {
    return (
      <TouchableOpacity
        onPress={() => navigate("ServiceSelector", { type: "reaction" })}
        style={{
          width: 62,
          height: 62,
          backgroundColor: reaction.color,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{ width: 42, height: 42 }}
          source={{ uri: reaction.image }}
        />
      </TouchableOpacity>
    );
  }
}

export default inject("store")(observer(CreationButton));
