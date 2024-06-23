import { createAction, createReducer } from '@reduxjs/toolkit';
type LikeState = {
  jokeIdArray: string[] | null;
};

export const likeAction = createAction<{ jokeId: string | null }>('joke/like');
export const dislikeAction = createAction<{ jokeId: string | null }>('joke/dislike');

const initialState = {
  jokeIdArray: []
} satisfies LikeState as LikeState;

const likeReducer = createReducer(initialState, (builder) => {
  console.log('hihi');
  builder.addCase(likeAction, (state, action) => {
        state.jokeIdArray.push(action.payload.jokeId);
        console.log('1',state.jokeIdArray)
        console.log('2',state)
  });
  builder.addCase(dislikeAction, (state, action) => {
    if (action.payload.jokeId) {
      state.jokeIdArray = state.jokeIdArray.filter(jokeId => jokeId !== action.payload.jokeId)
        console.log(state.jokeIdArray)
    }
  });
});

export default likeReducer;
