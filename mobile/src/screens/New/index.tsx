import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { useNavigation } from "react-navigation-hooks";
import Header from "../../components/Header";
import CloseButton from "../../components/CloseButton";
import styles from "./styles";
import CreationButton from "../../components/CreationButton";
import { getIdToken, getUserAREA } from "../../api/Services";
import Firebase from "../../providers/firebase";
import { toJS } from "mobx";

function New(props) {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    action,
    reaction,
    setSubscribe,
    apiUrl,
    setAction,
    setReaction
  } = props.store;

  const createAREA = async () => {
    const actionName = toJS(action).slugName;
    const reactionName = toJS(reaction).slugName;
    const actionData = toJS(action).form;
    const reactionData = toJS(reaction).form;
    const idToken: string = await getIdToken();

    setLoading(true);

    axios
      .put(
        `${apiUrl}/subscribe`,
        {
          actionName,
          actionData,
          reactionName,
          reactionData
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          getUserAREA(Firebase.auth().currentUser.email).then(res => {
            setSubscribe(res);
            setAction(null);
            setReaction(null);
            setLoading(false);
            navigate("Home");
          });
        }
      })
      .catch(e => {
        setLoading(false);
        Alert.alert(
          "Error message",
          "Something went wrong during the creation of the AREA"
        );
      });
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <Header title="Create your own" subTitle="" color="black" />
        <View style={styles.container}>
          <View>
            <Text style={styles.body}>If</Text>
            <CreationButton title="This" index={1} />
            <Text style={styles.body}>Then</Text>
            <CreationButton title="That" index={2} />
          </View>
        </View>
        <CloseButton />
        {reaction && action && (
          <TouchableOpacity onPress={() => createAREA()}>
            <View style={styles.button}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text style={styles.buttonText}>Create AREA</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
}

export default inject("store")(observer(New));
