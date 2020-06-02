import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topSafeAreaView: { flex: 0, backgroundColor: "red" },
  bottomSafeAreaView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingBottom: 24
  },
  description: {
    color: "white",
    fontFamily: "AvenirNext-Demi",
    fontSize: 16,
    marginVertical: 24
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6961",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  },
  buttonText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 22,
    fontStyle: "normal",
    color: "#ffffff"
  }
});

export default styles;
