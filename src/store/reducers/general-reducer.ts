import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {russianLanguage} from '../../language/russian';
import {englishLanguage} from '../../language/english';
import {saveLanguage, saveTheme, saveUser} from "../../utils/localData";
import {AppThunk} from '../store';
import {authUser} from "../../api/api";
import {useNavigate} from "react-router-dom";

export interface IUser {
    id: number,
    name: string,
    subName: string,
    login: string,
    password: string,
    email?: string
}

type SliceState = {
    currentLanguage: string;
    user: IUser | null;
    language: Record<string, string>;
    themeApp: boolean;
};

const initialState: SliceState = {
    currentLanguage: 'russian',
    language: russianLanguage,
    user: null,
    themeApp: true,
};


export const slice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setCurrentLanguage: (state, action: PayloadAction<string>) => {
            if (action.payload === 'russian') {
                state.language = russianLanguage;
            } else if (action.payload === 'english') {
                state.language = englishLanguage;
            }

            state.currentLanguage = action.payload;
            saveLanguage(action.payload)
        },


        changeTheme(state: SliceState, action: PayloadAction<boolean>) {
            state.themeApp = action.payload;
            saveTheme(action.payload)
        },

        setUser(state: SliceState, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
            saveUser(action.payload)
        },
    },
});

export const generalReducer = slice.reducer;

export const {setCurrentLanguage, changeTheme, setUser} = slice.actions;


export type GeneralActionsType =
    | ReturnType<typeof setCurrentLanguage>
    | ReturnType<typeof changeTheme>
    | ReturnType<typeof setUser>




export const getUserTC = (login: string, password: string): AppThunk => async dispatch => {
    try {
        const res = await authUser({login, password});
        const {user} = res.data
        if (user) {
            dispatch(setUser(user))
        }
    } catch (e) {
        console.log(e);
    }
};

