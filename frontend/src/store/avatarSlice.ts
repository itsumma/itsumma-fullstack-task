import { createSlice } from '@reduxjs/toolkit';
import { Person } from '@/pages/people';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AvatarState {
  avatar: string;
}

const initialState: AvatarState = {
avatar: '',
};

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
    setPerson(state, action) {

    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.avatar,
      };
    },
  },
});

export const { setAvatar } = avatarSlice.actions;

export default avatarSlice.reducer;

export const selectAvatar = (state: AppState) => state.avatar.avatar;
