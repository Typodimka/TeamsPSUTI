import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import {GeneralActionsType, generalReducer} from "./reducers/general-reducer";

export const store = configureStore({
    reducer: {
        general: generalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ActionsType =
    | GeneralActionsType


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    ActionsType
    >;
