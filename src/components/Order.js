import React, { useMemo, useState } from "react";

function Order({ order, index }) {
  const [groupItemsInBasket, setGroupItemsInBasket] = useState([]);
  const [isHold, setIsHold] = useState(false);
  const [isHold2, setIsHold2] = useState(false);
  const [message, setMessage] = useState("");
  const items = order?.order;

  useMemo(() => {
    const itemsArranged = [...items];
    let individualItems = [],
      groupAllItems = [];
    itemsArranged?.sort((r1, r2) =>
      r1.id > r2.id ? 1 : r1.id < r2.id ? -1 : 0
    );
    itemsArranged?.map((_, index) => {
      if (itemsArranged[index]?.id === itemsArranged[index + 1]?.id) {
        individualItems.push(itemsArranged[index]);
      } else {
        individualItems.length === 0
          ? individualItems.push(itemsArranged[index])
          : individualItems.push(itemsArranged[index - 1]);
        groupAllItems.push(individualItems);
        individualItems = [];
      }
    });
    setGroupItemsInBasket(groupAllItems);

    return () => {};
  }, [items.length]);

  const renderOrderItems = groupItemsInBasket?.map((item, index) => (
    <div
      className="flex flex-row items-center justify-center space-x-4"
      key={index}
    >
      <p className="text-center text-xl">{item[0].name}</p>
      <p className="text-red-700 text-4xl">x{item.length}</p>
    </div>
  ));

  const preparing = () => {
    setIsHold(!isHold);
    setMessage("Preparing...");
  };

  const done = () => {
    setIsHold2(true);
    setMessage("Dispatched");
  };

  return (
    <div
      key={index}
      className={`${
        isHold && !isHold2 ? "bg-green-600" : "bg-green-800"
      } py-10 flex relative flex-col items-center justify-center font-extrabold text-xl rounded-xl space-y-6 ${
        isHold2 ? "opacity-60" : "hover:scale-105"
      }`}
    >
      <p className="text-white text-4xl">Order {index + 1}</p>
      <div className="z-10">{renderOrderItems}</div>
      <div className="text-white text-2xl flex flex-row space-x-8">
        <p>Order Total</p>
        <p className="text-red-700">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          })
            .format(items.reduce((acum, item) => (acum += item.price), 0))
            .replace(",00", "")}
        </p>
      </div>
      {isHold && (
        <p
          className={`absolute text-6xl -z-0   ${
            isHold2 ? "text-green-400 opacity-50" : "text-white opacity-30"
          }`}
        >
          {message}
        </p>
      )}
      {isHold && !isHold2 && (
        <button
          className="absolute top-0 right-6 p-2 text-green-800"
          onClick={done}
        >
          Done
        </button>
      )}
      {!isHold && (
        <button
          className="absolute top-0 left-4 p-2 text-red-600"
          onClick={preparing}
        >
          Prepare
        </button>
      )}
    </div>
  );
}

export default Order;
