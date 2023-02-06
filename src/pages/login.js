import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { useRouter } from "next/router";

const auth = getAuth(app);

function Login() {
  useEffect(() => {}, []);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  // LogIn with Email and Password
  const logUser = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserData({ email: "", password: "" });
        // Go home
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        // alert.alert(
        //   "Login",
        //   error.message.replace("Firebase: Error (auth/", "").replace(").", ""),
        //   [{ text: "OK" }]
        // );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-5xl text-center text-green-700 font-extrabold mb-12">
        Welcome to the Orders Manager Client
      </p>
      <form
        className="space-y-6 flex flex-col items-center justify-center w-1/6"
        onSubmit={logUser}
      >
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
          className="bg-green-500 p-2 rounded w-full hover:scale-105"
          type="submit"
        >
          <p className="text-center font-bold text-white">Login</p>
        </button>
      </form>
    </div>
  );
}

export default Login;
