import { getAuth } from "firebase/auth";
import app from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

function Home() {
  const [orders, setOrders] = useState([]);
  const user = getAuth(app).currentUser;

  useEffect(() => {
    const getOrders = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setOrders(docSnap.data().orders);
      console.log("Looking for new data");
    };

    setInterval(getOrders, 12 * 1000);
    getOrders();

    return () => {
      clearInterval();
    };
  }, []);

  const renderOrders = orders?.map((order, index) => (
    <div className="bg-green-800 p-4 flex flex-col items-center justify-center font-extrabold text-xl hover:scale-105 rounded-xl">
      <p className="text-white">Order {index + 1}</p>
      <p className="items-center">{order.id}</p>
      <p className="text-white">{order.order.length} items</p>
    </div>
  ));
  // console.log(orders);

  return (
    <div className="bg-green-200 h-screen pt-4">
      <p className="text-center font-extrabold text-4xl">Orders Manager</p>
      <div className="grid grid-cols-2 gap-4 m-4">{renderOrders}</div>
    </div>
  );
}

export default Home;
