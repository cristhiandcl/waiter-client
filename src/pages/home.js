import { getAuth } from "firebase/auth";
import app from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import Order from "@/components/Order";

const db = getFirestore(app);

function Home() {
  const [orders, setOrders] = useState([]);
  const [isNewElement, setIsNewElement] = useState(false);
  const user = getAuth(app).currentUser;
  const id = user?.uid;

  console.log(orders);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", id), () => {
        setIsNewElement((prev) => !prev);
      }),
    []
  );

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setOrders(docSnap.data().orders);
    })();
  }, [isNewElement]);

  const renderOrders = orders?.map((order, index) => (
    <Order order={order} index={index} key={order.id} />
  ));

  return (
    <div
      className={`flex flex-col ${orders.length > 0 ? "h-full" : "h-screen"}`}
    >
      <p className="text-center font-extrabold text-4xl mt-4">Orders Manager</p>
      {orders.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 m-12">{renderOrders}</div>
      ) : (
        // <div className="h-full flex flex-col items-center justify-center border">
        <p className="flex flex-col self-center justify-center font-extrabold text-8xl text-green-800 text-center h-full">
          Let's get some Orders
        </p>
        // </div>
      )}
    </div>
  );
}

export default Home;
