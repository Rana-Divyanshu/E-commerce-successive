import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// updateProfile,
// import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// const db = getFirestore();

// export const registerUser = async (
//   email,
//   password,
//   userName,
//   userImg = null
// ) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Update user profile
//     await updateProfile(user, {
//       displayName: userName,
//       photoURL: userImg,
//     });

//     // Save additional details in Firestore
//     await setDoc(doc(db, "users", user.uid), {
//       email: user.email,
//       userName: userName,
//       userImg: userImg,
//       createdAt: new Date(),
//     });

//     return user;
//   } catch (error) {
//     console.error("Error registering user:", error.message);
//     throw error;
//   }
// };

// export const getUserData = async (uid) => {
//   try {
//     const docRef = doc(db, "users", uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       console.error("No user data found!");
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error.message);
//     throw error;
//   }
// };

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};
