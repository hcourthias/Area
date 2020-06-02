import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontFamily: "AvenirNext-Heavy",
    fontSize: 42,
    marginLeft: 32
  },
  subtitle: {
    marginHorizontal: 32,
    fontFamily: "AvenirNext-Bold",
    fontSize: 22,
    lineHeight: 40,
    marginTop: 12
  },
  subtitle2: {
    width: "100%",
    fontFamily: "AvenirNext-Bold",
    fontSize: 22,
    fontStyle: "normal",
    textAlign: "center"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d24a3b",
    justifyContent: "center",
    alignItems: "center"
  },
  emailButton: {
    backgroundColor: "#000000"
  },
  buttonText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 22,
    fontStyle: "normal",
    color: "#ffffff"
  }
});

export default styles;
