import axios from "axios";
import {IUser} from "../store/reducers/general-reducer";

const instance = axios.create({
    baseURL: `http://localhost:5000/api/user`,
});

export const authUser = (user: {login: string, password: string}) => {
    return instance.post<RequestUserType>("auth", user);
}

export interface RequestUserType {
    message: string,
    success: boolean,
    user: IUser
}