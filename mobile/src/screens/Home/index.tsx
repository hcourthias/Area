import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
import Firebase, { db } from "../../providers/firebase";
import ServiceCard from "../../components/ServiceCard";
import { FlatGrid } from "react-native-super-grid";
import { getAllServices, getUserAREA } from "../../api/Services";
import { observer, inject, Observer } from "mobx-react";
import SubscribeCard from "../../components/SubscribeCard";
import { toJS } from "mobx";
import Placeholder from "../../components/Placeholder";

function Home(props) {
  const { navigate } = useNavigation();

  const { subscribe, setSubscribe, deleteSubscribe } = props.store;

  useEffect(() => {
    getUserAREA(Firebase.auth().currentUser.email).then(res =>
      setSubscribe(res)
    );
  }, []);

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <View style={styles.topContainer}>
          <Text style={styles.title}>AREA</Text>
          <TouchableOpacity onPress={() => navigate("Settings")}>
            <Text style={styles.email}>
              {Firebase.auth().currentUser.email}
            </Text>
          </TouchableOpacity>
        </View>
        {subscribe.length === 0 ? (
          <Placeholder message="You currently have no AREA setup. You can start creating a new one by clicking the button below." />
        ) : (
          <ScrollView style={styles.scrollView}>
            <FlatList
              data={subscribe}
              extraData={toJS(subscribe)}
              style={{ paddingTop: 24 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SubscribeCard
                  action={item.data.action.name}
                  reaction={item.data.reaction.name}
                  email={item.data.user}
                  id={item.id}
                  index={index}
                />
              )}
            />
          </ScrollView>
        )}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigate("New")}
          >
            <Text style={styles.bottomButtonText}>New</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

export default inject("store")(observer(Home));
