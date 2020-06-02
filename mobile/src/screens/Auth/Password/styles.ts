import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    marginTop: 32,
    marginBottom: 52,
    fontFamily: "AvenirNext-Bold",
    fontSize: 25
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
    color: "#ffffff"
  },
  input: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 25,
    marginBottom: 32,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "black"
  },
  buttonDisabled: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  }
});

export default styles;
