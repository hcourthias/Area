import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "white",
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomContainer: {
    padding: 24,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "AvenirNext-Heavy",
    fontSize: 42
  },
  email: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 14
  },
  bottomButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#3d3d3d",
    borderRadius: 25
  },
  bottomButtonText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 18,
    color: "white"
  },
  topSafeAreaView: { flex: 0, backgroundColor: "white" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "black" },
  scrollView: { flex: 1, backgroundColor: "white" }
});

export default styles;
