import React, { useMemo, useState } from "react";

function Order({ order, index }) {
  const [groupItemsInBasket, setGroupItemsInBasket] = useState([]);
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
  }, [items]);

  const renderOrderItems = groupItemsInBasket?.map((item) => (
    <div className="flex flex-row items-center  justify-center space-x-4">
      <p className="text-center text-xl">{item[0].name}</p>
      <p className="text-red-700 text-4xl">x{item.length}</p>
    </div>
  ));

  console.log("Rendered");
  return (
    <div
      key={index}
      className="bg-green-800 py-10 flex flex-col items-center justify-center font-extrabold text-xl hover:scale-105 rounded-xl space-y-6"
    >
      <p className="text-white text-4xl">Order {index + 1}</p>
      <div>{renderOrderItems}</div>
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
    </div>
  );
}

export default Order;
