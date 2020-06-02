import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import BackArrow from "../../../../assets/left-arrow.svg";
import styles from "./styles";
import validateEmail from "../../../utils/Validator";
import { checkEmailOnFirebase } from "../../../api/Auth";

export default () => {
  const { goBack, navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const goToPassword = () => {
    Keyboard.dismiss();
    setLoading(true);
    checkEmailOnFirebase(email).then(res => {
      setLoading(false);
      navigate("Password", {
        mail: email,
        status: res
      });
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ justifyContent: "space-between", flex: 1 }}
        behavior="padding"
      >
        <View style={{ paddingTop: 32 }}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackArrow width={96} height={32} />
          </TouchableOpacity>
          <Text style={styles.title}>What’s your email ?</Text>
          <TextInput
            style={styles.input}
            selectionColor="black"
            autoCapitalize="none"
            placeholder="Enter your email"
            autoCorrect={false}
            value={email}
            onChangeText={input => {
              setEmail(input);
              if (validateEmail(input)) setIsValid(true);
              else setIsValid(false);
            }}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={() => goToPassword()}
          disabled={!isValid}
        >
          <View style={isValid ? styles.button : styles.buttonDisabled}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
