import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products";
import cartReducer from "./slices/cart";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    userState: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
