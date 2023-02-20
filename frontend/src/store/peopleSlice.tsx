import { createSlice } from '@reduxjs/toolkit';
import { Person } from '@/pages/people';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import type { PayloadAction } from '@reduxjs/toolkit';

// export const fetchArticles = createAsyncThunk('api/peoples', async () => {
//   const { data } = await axios.get(`http://localhost:3001/api/peoples`)
//   return data
// })

interface PeopleState {
  people: Person[];
  status: string;
  error: null;
}

const initialState: PeopleState = {
  people: [],
  status: 'idle',
  error: null,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<Person[]>) {
      state.people = action.payload;
    },
    setPerson(state, action: PayloadAction<Person>) {
      const index = state.people.findIndex((person) => person.id === action.payload.id);
      state.people = [
        ...state.people.slice(0, index),
        action.payload,
        ...state.people.slice(index + 1),
      ];
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.people,
      };
    },
  },
});

export const { setPeople } = peopleSlice.actions;

export default peopleSlice.reducer;

export const selectPeople = (state: AppState) => state.people.people;
