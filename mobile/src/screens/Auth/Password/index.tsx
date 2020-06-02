import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import BackArrow from "../../../../assets/left-arrow.svg";
import Firebase from "../../../providers/firebase";
import Log from "../../../utils/Log";
import styles from "./styles";

export default () => {
  const { navigate, goBack, getParam } = useNavigation();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const buttonClicked = () => {
    setLoading(true);
    if (getParam("status", false)) {
      Firebase.auth()
        .signInWithEmailAndPassword(getParam("mail", ""), password)
        .then(() => {
          Log("User Logged");
          setLoading(false);
          navigate("Home");
        })
        .catch(error => {
          Alert.alert("Login error", error.message);
          setLoading(false);
          Log(error);
        });
    } else {
      Firebase.auth()
        .createUserWithEmailAndPassword(getParam("mail", ""), password)
        .then(() => {
          Log("User Created");
          setLoading(false);
          navigate("Home");
        })
        .catch(error => {
          Alert.alert("Login error", error.message);
          setLoading(false);
          Log(error);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ justifyContent: "space-between", flex: 1 }}
        behavior="padding"
      >
        <View style={{ padding: 32 }}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackArrow width={32} height={32} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {getParam("status", false)
              ? "Welcome back, enter your password."
              : "Create your password."}
          </Text>
          <TextInput
            style={styles.input}
            selectionColor="black"
            autoCapitalize="none"
            secureTextEntry
            placeholder="Enter your password"
            autoCorrect={false}
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (password.length > 5) setIsValid(true);
              else setIsValid(false);
            }}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => buttonClicked()}
          disabled={!isValid}
        >
          <View style={isValid ? styles.button : styles.buttonDisabled}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>
                {getParam("status", false) ? "Login" : "Create an account"}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
