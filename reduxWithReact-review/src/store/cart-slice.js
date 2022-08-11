import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0, itemsTotalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity = state.totalQuantity + 1;
      state.itemsTotalPrice = state.itemsTotalPrice + newItem.price; 
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
        {
          /* 기존 상태를 변경하는 것 처럼 보이지만 toolkit이 처리 */
        }
      } else if (existingItem){
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price 
      }
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload.id;
      const existingItem = state.items.find(item => item.id === itemId)
      state.totalQuantity = state.totalQuantity -1;
      state.itemsTotalPrice = state.itemsTotalPrice - existingItem.price;
      if(existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== itemId)
      } else {
        existingItem.quantity = existingItem.quantity -1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
