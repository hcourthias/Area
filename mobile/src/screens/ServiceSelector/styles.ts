import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topSafeAreaView: { flex: 0, backgroundColor: "black" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "black" },
  header: {
    backgroundColor: "black",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32
  },
  container: {
    backgroundColor: "white",
    height: "85%",
    justifyContent: "center",
    alignItems: "center"
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
  },
  searchBar: {
    marginTop: 22,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: "10%",
    width: "80%",
    alignItems: "center"
  },
  searchBarText: {
    fontFamily: "AvenirNext-Demi",
    padding: 12,
    width: "100%"
  }
});

export default styles;
