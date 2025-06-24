const ID_TOKEN_KEY = "id_token";

export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

function parseJwt(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

export const getUserId = () => {
    const token = getToken();
    const data = token && parseJwt(token);
    return data?.sub || null;
};

export const getUserRole = () => {
    const token = getToken();
    const data = token && parseJwt(token);
    return data?.role || null;
};

export default { getToken, saveToken, destroyToken, getUserId, getUserRole };