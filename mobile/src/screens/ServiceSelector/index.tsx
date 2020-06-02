import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import ServiceCard from "../../components/ServiceCard";
import CloseButton from "../../components/CloseButton";
import Header from "../../components/Header";
import { getAllServices } from "../../api/Services";
import styles from "./styles";
import { ServiceProps } from "../../type/ServiceType";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const [services, setServices] = useState([]);
  const t = useNavigation().getParam("type");

  const filterByValue = (data, t) => {
    const tmp = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const service of data) {
      if (service.type === t) {
        tmp.push(service);
      }
    }
    console.log(tmp);
    return tmp;
  };

  useEffect(() => {
    getAllServices().then(result => {
      setServices(filterByValue(result, t));
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.topSafeAreaView} />
      <SafeAreaView style={styles.bottomSafeAreaView}>
        {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
        <Header title="Create your own" subTitle="Select trigger service" />
        <CloseButton />
        {services.length > 0 ? (
          <FlatGrid
            itemDimension={100}
            items={services}
            fixed
            spacing={0}
            renderItem={({ item }: { item: ServiceProps }) => (
              <ServiceCard
                authentification={item.authentification}
                name={item.name}
                color={item.color}
                description={item.description}
                image={item.image}
                type={t}
              />
            )}
          />
        ) : (
          <ActivityIndicator />
        )}
      </SafeAreaView>
    </>
  );
};
