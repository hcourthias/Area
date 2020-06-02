import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  email: {
    fontFamily: "AvenirNext-Bold",
    margin: 15,
    fontSize: 21,
    alignSelf: "center"
  },
  safeAreaView: { flex: 1, backgroundColor: "white" },
  topContainer: {
    marginHorizontal: 32,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0,0,0,0.02)"
  },
  avatar: {
    height: 128,
    width: 128,
    borderRadius: 64,
    alignSelf: "center"
  },
  scrollViewWrapper: {
    marginHorizontal: 32,
    marginVertical: 16,
    height: "100%"
  },
  itemText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 24,
    color: "#ff6961"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginTop: 16
  },
  buttonText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 22,
    fontStyle: "normal",
    color: "#ffffff"
  }
});

export default styles;
