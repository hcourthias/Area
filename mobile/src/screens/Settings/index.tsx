import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import Log from "../../utils/Log";
import Firebase from "../../providers/firebase";
import { TextInput } from "react-native-gesture-handler";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { urlCheck } from "../../api/Auth";
function Settings(props) {
  const { navigate, goBack } = useNavigation();

  const [serverUrl, setServerUrl] = useState(toJS(props.store.apiUrl));
  const [loading, setLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  const signOutUser = async () => {
    setSignOutLoading(true);
    try {
      await Firebase.auth().signOut();
      setSignOutLoading(false);
      navigate("Welcome");
    } catch (e) {
      setSignOutLoading(false);
      Alert.alert("Error:", "Failed to signout");
    }
  };

  const testUrl = async () => {
    setLoading(true);
    urlCheck(serverUrl).then(res => {
      if (res === "INVALID_URL")
        Alert.alert("Info message", "Your server url is invalid.");
      else {
        props.store.setApiUrl(serverUrl);
        setLoading(false);
        navigate("Home");
      }
      setLoading(false);
    });
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <MaterialCommunityIcons name="window-close" size={38} color="black" />
        </TouchableOpacity>
        <Image
          style={styles.avatar}
          source={require("../../../assets/no_profile_image.png")}
        />
        <Text style={styles.email}>{Firebase.auth().currentUser?.email}</Text>
      </View>
      <View>
        <ScrollView style={styles.scrollViewWrapper}>
          <View style={{ marginVertical: 16 }}>
            <Text style={{ fontFamily: "AvenirNext-Bold", fontSize: 24 }}>
              Server URL
            </Text>
            <TextInput
              style={{
                paddingLeft: 12,
                height: 45,
                borderColor: "#eee",
                borderWidth: 2,
                marginTop: 6,
                borderRadius: 8,
                fontFamily: "AvenirNext-Bold"
              }}
              value={serverUrl}
              onChangeText={text => setServerUrl(text)}
            />
          </View>
          <TouchableOpacity onPress={() => testUrl()}>
            <View style={styles.button}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonText}>Save & Test URL</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOutUser()}>
            <View style={[styles.button, { backgroundColor: "#ff6961" }]}>
              {signOutLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonText}>Logout</Text>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default inject("store")(observer(Settings));
