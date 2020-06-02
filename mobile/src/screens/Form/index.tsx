import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import Header from "../../components/Header";
import styles from "./styles";
import ActionButton from "../../components/ActionButton";
import CloseButton from "../../components/CloseButton";
import { getServiceActions } from "../../api/Services";
import { Dropdown } from "react-native-material-dropdown";
import { observer, inject } from "mobx-react";
import { action } from "mobx";

function Form(props) {
  const { navigate } = useNavigation();
  const actionItem = useNavigation().getParam("item");
  const image = useNavigation().getParam("image");
  const color = useNavigation().getParam("color");
  const type = useNavigation().getParam("type");

  let formResult = {};
  const { setAction, setReaction } = props.store;

  const onChangeText = (name, text) => {
    formResult[name] = text;
  };
  const renderForm = item => {
    const values = [];
    if (item.selectionBox) {
      for (let i = 0; i < item.selectionBox.values.length; i += 1) {
        values.push({ value: item.selectionBox.values[i] });
      }
      formResult[item.selectionBox.name] = values[0].value;
      return (
        <Dropdown
          label={item.selectionBox.name}
          data={values}
          value={values[0].value}
          onChangeText={text => onChangeText(item.selectionBox.name, text)}
        />
      );
    }
    if (item.checkbox) {
      formResult[item.checkbox.name] = false;
      console.log("checkbox");
    }
    if (item.input) {
      formResult[item.input.name] = "";
      return (
        <View style={{ marginVertical: 16 }}>
          <Text>{item.input.title}</Text>
          <TextInput
            style={{
              paddingLeft: 12,
              height: 45,
              borderColor: "#eee",
              borderWidth: 2,
              marginTop: 6,
              borderRadius: 8
            }}
            onChangeText={text => onChangeText(item.input.name, text)}
          />
        </View>
      );
    }
  };

  const isReady = () => {
    actionItem.form = formResult;
    actionItem.image = image;
    actionItem.color = color;
    console.log(actionItem);
    if (type === "action") setAction(actionItem);
    else setReaction(actionItem);
    navigate("New");
  };

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <Header
          title="Create your own"
          subTitle="Configure action"
          color="black"
        />
        <CloseButton />
        <Text style={styles.description}>{actionItem.description}</Text>
        <View
          style={{
            paddingHorizontal: 24,
            justifyContent: "space-between",
            flex: 1
          }}
        >
          <FlatList
            data={actionItem.form}
            style={{ paddingTop: 24 }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderForm(item)}
          />
          <TouchableOpacity onPress={() => isReady()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

export default inject("store")(observer(Form));
