import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "firebaseConfig";
import React, { useState } from "react";
import { useAlert } from "react-alert";

const auth = getAuth(app);
const db = getFirestore(app);

function signIn() {
  const alert = useAlert();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    restaurant: "",
  });

  const createUser = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: userData.name,
        }).then(() => {
          (async () => {
            await setDoc(
              doc(db, "users", user.uid),
              { restaurantName: `${userData.restaurant}` },
              { merge: true }
            );
          })();
          alert.show("User Created Successfully");
          setUserData({
            email: "",
            password: "",
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        alert.show(
          error.message
            .replace("Firebase: Error (auth/", "")
            .replace(").", "")
            .replace(/-/g, " ")
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-5xl text-center text-blue-400 font-extrabold mb-12">
        Admin
      </p>
      <form
        className="space-y-6 flex flex-col items-center justify-center w-1/6"
        onSubmit={createUser}
      >
        <div className="space-y-2 w-full">
          <p className="font-extrabold">Restaurant Name</p>
          <input
            className="border-2 p-2 w-full"
            value={userData.restaurant}
            onChange={(event) =>
              setUserData({ ...userData, restaurant: event.target.value })
            }
            placeholder="Password"
          />
        </div>
        <div className="space-y-2 w-full">
          <p className="font-extrabold">E-mail</p>
          <input
            className="border-2 p-2 w-full"
            value={userData.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
            placeholder="Email"
          />
        </div>
        <div className="space-y-2 w-full">
          <p className="font-extrabold">Password</p>
          <input
            className="border-2 p-2 w-full"
            value={userData.password}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
            placeholder="Password"
          />
        </div>
        <button
          className="bg-blue-400 p-2 rounded w-full hover:scale-105"
          type="submit"
        >
          <p className="text-center font-bold text-white">Create User</p>
        </button>
      </form>
    </div>
  );
}

export default signIn;
