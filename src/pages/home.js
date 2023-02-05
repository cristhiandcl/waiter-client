import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/items")
      .then((response) => setOrders(response.data));
  }, []);

  const renderOrders = orders.map((order) => (
    <div className="bg-green-800 p-4 flex flex-col items-center justify-center font-extrabold text-xl hover:scale-105 rounded-xl">
      <p>{order.name}</p>
      <p className="text-white">{order.age}</p>
    </div>
  ));
  return (
    <div className="bg-green-200 h-screen pt-4">
      <p className="text-center font-extrabold text-4xl">Orders Manager</p>
      <div className="grid grid-cols-2 gap-4 m-4">{renderOrders}</div>
    </div>
  );
}

export default Home;
