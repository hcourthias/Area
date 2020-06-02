import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "black" },
  header: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24
  },
  headerTitle: {
    color: "white",
    fontFamily: "AvenirNext-Bold",
    fontSize: 26
  },
  headerSubTitle: {
    color: "white",
    fontFamily: "AvenirNext-Demi",
    fontSize: 16
  }
});

export default styles;
