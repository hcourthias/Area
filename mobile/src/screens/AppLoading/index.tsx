import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import Firebase from "../../providers/firebase";
import Log from "../../utils/Log";

export default () => {
  const { navigate } = useNavigation();
  const [user, initialising] = useAuthState(Firebase.auth());

  useEffect(() => {
    if (initialising) Log("Initialising User...");
    else if (user) {
      Log("AppLoading: User is logged");
      navigate("Home");
    } else {
      Log("AppLoading: User isn't logged");
      navigate("Welcome");
    }
  });

  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <ActivityIndicator size="small" color="black" />
    </View>
  );
};
