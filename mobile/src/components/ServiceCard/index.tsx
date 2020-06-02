import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "react-navigation-hooks";
import styles from "./styles";
import { ServiceProps } from "../../type/ServiceType";
import { loginOauth, handleNotification } from "../../api/Auth";
import { inject, observer } from "mobx-react";

function ServiceCard(props: ServiceProps) {
  const { image, color, name } = props;
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.wrapper, { backgroundColor: color }]}
      onPress={() => {
        if (props.name === "Notification") {
          handleNotification()
            .then(() => navigate("ActionSelector", { serviceInfo: props }))
            .catch(err => console.log(err));
        } else if (props.authentification) {
          loginOauth(props.authentification, name, props.store.apiUrl)
            .then(() => navigate("ActionSelector", { serviceInfo: props }))
            .catch(err => console.log(err));
        } else {
          navigate("ActionSelector", { serviceInfo: props });
        }
      }}
    >
      <View>
        <Image
          resizeMode="contain"
          style={{ width: 100, height: 40 }}
          source={{
            uri: image
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default inject("store")(observer(ServiceCard));
