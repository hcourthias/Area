import React, { useRef } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import { AuthSession } from "expo";
import { useNavigation } from "react-navigation-hooks";
import { loginGoogleStandalone } from "../../../api/Auth";
import auth from "../../../api/twitter";

import styles from "./styles";

export default () => {
  const { navigate } = useNavigation();

  const handleTwitter = () => {
    Alert.alert("Facebook", "Facebook login is not available for the moment.", [
      { text: "OK" }
    ]);
  };

  const handleGoogle = () => {
    loginGoogleStandalone()
      .then(() => navigate("Home"))
      .catch(err => Alert.alert("Error:", err));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <View
        style={{
          paddingTop: 32,
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={styles.title}>AREA</Text>
          <Text style={styles.subtitle}>One tap to connect your life.</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "50%",
            marginTop: -50,
            alignItems: "center"
          }}
        />
        <View style={{ paddingHorizontal: 50, width: "100%" }}>
          <Text style={styles.subtitle2}>Sign in with</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 24,
              width: "100%"
            }}
          >
            <TouchableOpacity
              style={{ width: "48%" }}
              onPress={() => handleGoogle()}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "48%" }}
              onPress={() => handleTwitter()}
            >
              <View style={[styles.button, { backgroundColor: "#4265a7" }]}>
                <Text style={styles.buttonText}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigate("Email")}>
            <View style={[styles.button, styles.emailButton]}>
              <Text style={styles.buttonText}>Email</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
