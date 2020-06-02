/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import * as GoogleSignIn from "expo-google-sign-in";
import firebase from "firebase";
import Firebase, {
  GOOGLE_CLIENT_IOS_STAND,
  WEB_CLIENT_ID,
  WEB_CLIENT_SECRET,
  db
} from "../providers/firebase";
import { AuthSession, Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Platform, Alert } from "react-native";

export const loginGoogleStandalone = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await GoogleSignIn.initAsync({
        clientId: GOOGLE_CLIENT_IOS_STAND,
        isOfflineEnabled: true,
        webClientId: WEB_CLIENT_ID
      });
    } catch ({ message }) {
      reject(message);
    }
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();

      if (type === "success") {
        fetch(
          `https://oauth2.googleapis.com/token?code=${user.serverAuthCode}&client_id=${WEB_CLIENT_ID}\
          &client_secret=${WEB_CLIENT_SECRET}&grant_type=authorization_code`,
          {
            method: "POST"
          }
        )
          .then(response => response.json())
          .then(data => {
            const token = {
              accessToken: data.access_token,
              idToken: user?.auth?.idToken,
              refreshToken: data.refresh_token
            };
            const credential = firebase.auth.GoogleAuthProvider.credential(
              token.idToken,
              token.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(() => {
                resolve("SUCCESS");
              });
          });
      }
    } catch ({ message }) {
      reject(message);
    }
  });
};

export const checkEmailOnFirebase = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Firebase.auth()
      .fetchSignInMethodsForEmail(email)
      .then(response => {
        if (response.includes("password")) resolve(true);
        resolve(false);
      })
      .catch(err => reject(err));
  });
};

export async function loginOauth(
  oauthUrl: string,
  name: string,
  API_URL: string
) {
  return db
    .collection("User")
    .where("idUser", "==", Firebase.auth().currentUser?.uid)
    .get()
    .then(async snapshot => {
      if (snapshot.docs[0].get(name) != null) {
        console.log("alreadyLoggedIn");
      } else {
        let result = await AuthSession.startAsync({
          authUrl:
            oauthUrl +
            `&redirect_uri=${API_URL}/${name.toLowerCase()}/oauth/authorize/proxy/expo`
        });
        const response = await fetch(
          `${API_URL}/${name.toLowerCase()}/oauth/authorize?code=${
            result.params.code
          }&redirect_uri=${API_URL}/${name.toLowerCase()}/oauth/authorize/proxy/expo`
        );
        const tmp = await response.json();
        if (tmp.code !== "00") {
          Alert.alert("OAuth Error", "Error while processing OAuth");
          throw "Error when processing OAuth";
        }

        db.collection("User")
          .where("idUser", "==", Firebase.auth().currentUser?.uid)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              return db
                .collection("User")
                .doc()
                .set({
                  idUser: Firebase.auth().currentUser?.uid,
                  [name]: tmp.data
                });
            } else {
              return db
                .collection("User")
                .doc(snapshot.docs[0].id)
                .update({
                  idUser: Firebase.auth().currentUser?.uid,
                  [name]: tmp.data
                });
            }
          });
      }
    });
}

export async function handleNotification() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    Alert.alert(
      "Permissions Error",
      "You need to enabled notification in app settings"
    );
    throw new Error("Notification Permissions Error");
  }

  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("pushChannel", {
      name: "pushChannel",
      priority: "max",
      vibrate: [0, 250, 250, 250]
    });
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  db.collection("User")
    .where("idUser", "==", Firebase.auth().currentUser?.uid)
    .get()
    .then(snapshot => {
      const tmp = [];
      console.log(tmp);
      if (snapshot.empty) {
        tmp.push(token);
        return db
          .collection("User")
          .doc()
          .set({
            idUser: Firebase.auth().currentUser?.uid,
            Notification: { expo: tmp }
          });
      } else {
        if (
          snapshot.docs[0].data().Notification &&
          snapshot.docs[0].data().Notification.expo
        )
          tmp.push(...snapshot.docs[0].data().Notification.expo);
        if (!tmp.includes(token)) tmp.push(token);
        return db
          .collection("User")
          .doc(snapshot.docs[0].id)
          .update({
            idUser: Firebase.auth().currentUser?.uid,
            Notification: { expo: tmp }
          });
      }
    });
}

export async function urlCheck(url: string) {
  if (url.endsWith("/")) {
    url.slice(0, -1);
  }
  return fetch(`${url}/about.json`)
    .then(res => res.json())
    .then(out => {
      if (out.server.signature === "overlord") {
        return "VALID_URL";
      } else return "INVALID_URL";
    })
    .catch(() => {
      return "INVALID_URL";
    });
}
