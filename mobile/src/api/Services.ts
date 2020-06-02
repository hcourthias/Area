/* eslint-disable import/prefer-default-export */
import Firebase, { db } from "../providers/firebase";

export async function getIdToken() {
  return Firebase.auth().currentUser.getIdToken();
}

async function generateUserRequest(method = "GET") {
  return {
    method,
    headers: {
      Authorization: await getIdToken()
    }
  };
}

export const getAllServices = async () => {
  try {
    const snapshot = await db.collection("Services").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (e) {
    return e;
  }
};

export const getUserAREA = email => {
  return new Promise((resolve, reject) => {
    const tmp = [];
    try {
      db.collection("Area")
        .where("user", "==", email)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            tmp.push({ id: doc.id, data: doc.data() });
          });
          resolve(tmp);
        })
        .catch(function(error) {
          reject(error);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export async function getServiceActions(serviceName, type, API_URL) {
  console.log(`${API_URL}/${type}s/${serviceName}`);
  try {
    const generated = await generateUserRequest();
    console.log(generated);
    const response = await fetch(
      `${API_URL}/${type}s/${serviceName}`,
      generated
    );
    // console.log(await response.json());
    return await response.json();
  } catch (error) {
    return error;
  }
}
