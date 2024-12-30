import { User, UserSettings } from "@/utils/types";
import { createAppSlice } from "../createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
  user: User | null;
  settings: UserSettings;
}

const initialState: UserSliceState = {
  user: null,
  settings: {
    theme: "system",
    native: null,
    languages: [],
  },
};

const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserSettings: (state, action: PayloadAction<UserSettings>) => {
      state.settings = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserSettings: (state) => state.settings,
  },
});

export const { setUser, setUserSettings } = userSlice.actions;
export const { selectUser, selectUserSettings } = userSlice.selectors;

export { userSlice };
export type { UserSliceState };
