import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topSafeAreaView: { flex: 0, backgroundColor: "black" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "white" },
  description: {
    color: "black",
    fontFamily: "AvenirNext-Demi",
    fontSize: 16,
    marginHorizontal: 24,
    marginVertical: 24,
    textAlign: "center"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
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
