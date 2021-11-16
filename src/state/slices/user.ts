import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  isLoadingUser: boolean;
  user: any;
}

const initialState = {
  user: null,
  isLoadingUser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state: IUserState, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    loadingUser: (state: IUserState) => {
      return {
        ...state,
        isLoadingUser: true,
      };
    },
    resetState: (state: IUserState) => {
      return {
        ...state,
        user: null,
        isLoadingUser: false,
      };
    },
  },
});

export const { storeUser, loadingUser, resetState } = userSlice.actions;

export default userSlice.reducer;

//export const {load} = productsSlice.actions;

// export default productsSlice.reducer;

//   export default function (state = initialState, action) {
//     switch (action.type) {
//       case STORE_USER:
//         return {
//           ...state,
//           isLoadingUser: false,
//           user: action.payload
//         }
//       case LOADING_USER:
//         return {
//           ...state,
//           isLoadingUser: true
//         }
//       case USER_EXPIRED:
//       case STORE_USER_ERROR:
//       case USER_SIGNED_OUT:
//         return {
//           ...state,
//           user: null,
//           isLoadingUser: false
//         }
//       default:
//         return state
//     }
//   }
