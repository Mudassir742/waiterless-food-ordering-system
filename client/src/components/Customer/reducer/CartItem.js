const CartItem = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      let newState = state;
      const found = newState.find(
        (item) => parseInt(item.itemID) === parseInt(action.payload.itemID)
      );

      if (found) {
        newState = newState.map((item) => {
          if (parseInt(item.itemID) === parseInt(action.payload.itemID)) {
            item.itemQuantity++;
          }
          return item;
        });
        return newState;
      }

      return [...state, { ...action.payload, itemQuantity: 1 }];
    }
    case "REMOVE_ITEM":
      if (action.payload.itemQuantity === 1) {
        return state.filter(
          (item) => parseInt(item.itemID) !== parseInt(action.payload.itemID)
        );
      } else {
        let newState = state;

        newState = newState.map((item) => {
          if (
            parseInt(item.itemID) === parseInt(action.payload.itemID) &&
            item.itemQuantity > 1
          ) {
            item.itemQuantity--;
          }
          return item;
        });
        return newState;
      }
  }

  return state;
};

export default CartItem;
