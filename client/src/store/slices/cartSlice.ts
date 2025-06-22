// client/src/store/slices/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IProductWithQuantity } from '../../models/IProduct';

interface CartState {
  items: IProductWithQuantity[];
  totalAmount: number;
  totalCount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalCount: 0,
};

const calculateTotals = (items: IProductWithQuantity[]) => {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalCount, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProductWithQuantity>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    },
    setCart: (state, action: PayloadAction<IProductWithQuantity[]>) => {
      state.items = action.payload;
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;