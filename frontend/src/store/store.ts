import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import peopleReducer from './peopleSlice'
import avatarReducer from './avatarSlice';

const makeStore = () => configureStore({
  reducer: {
    people: peopleReducer,
    avatar: avatarReducer,
  },
})

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
