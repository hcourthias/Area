import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Header from "../../components/Header";
import styles from "./styles";
import ActionButton from "../../components/ActionButton";
import CloseButton from "../../components/CloseButton";
import { getServiceActions } from "../../api/Services";
import { inject, observer } from "mobx-react";
import Placeholder from "../../components/Placeholder";
import { toJS } from "mobx";
import { db } from "../../providers/firebase";

function SubscribeDetails(props) {
  const { action, reaction, email, id } = useNavigation().getParam(
    "ServiceInfo"
  );
  const { deleteSubscribe } = props.store;
  const { navigate } = useNavigation();

  const removeSub = () => {
    db.collection("Area")
      .doc(id)
      .delete()
      .then(function() {
        deleteSubscribe(toJS(id));
        navigate("Home");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <>
      <SafeAreaView
        style={[styles.topSafeAreaView, { backgroundColor: "black" }]}
      />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <View>
          <Header title="" subTitle="" color="black" />
          <View
            style={{
              backgroundColor: "black",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "AvenirNext-Bold",
                fontSize: 42,
                padding: 16
              }}
            >
              {`If ${action}, then ${reaction}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeSub()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Delete AREA</Text>
          </View>
        </TouchableOpacity>
        <CloseButton />
      </SafeAreaView>
    </>
  );
}

export default inject("store")(observer(SubscribeDetails));
