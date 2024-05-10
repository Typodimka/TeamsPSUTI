import {IUser} from "../store/reducers/general-reducer";

export const loadUser = () => {
    try {
        const localUser = localStorage.getItem('user');
        if (localUser === null) {
            return undefined;
        }
        return JSON.parse(localUser);
    } catch (err) {
        return undefined;
    }
};

export const saveUser = (user: IUser | null) => {
    const localUSer = JSON.stringify(user);
    console.log(localUSer)

    localStorage.setItem('user', localUSer);
};


export const loadLanguage = () => {
    try {
        const localLanguage = localStorage.getItem('language');
        if (localLanguage === null) {
            return undefined;
        }
        return JSON.parse(localLanguage);
    } catch (err) {
        return undefined;
    }
};

export const saveLanguage = (language: string) => {
    const localLanguage = JSON.stringify(language);
    localStorage.setItem('language', localLanguage);
};




export const loadTheme = () => {
    try {
        const localTheme = sessionStorage.getItem('theme');
        if (localTheme === null) {
            return false;
        }
        return JSON.parse(localTheme);
    } catch (err) {
        return false;
    }
};

export const saveTheme = (theme: boolean) => {
    const localTheme = JSON.stringify(theme);
    sessionStorage.setItem('theme', localTheme);
};

