export const getUserAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken || "";
}

export const setUserAccessToken = (token: string) => {
    return localStorage.setItem("accessToken", token);
}

export const setUserAccessId = (id: string) => {
    return localStorage.setItem("accessId", id);
}

export const getUserAccessId = () => {
    const userId = localStorage.getItem("accessId");
    return userId || "";
}

export const setUserAccessName = (id: string) => {
    return localStorage.setItem("accessName", id);
}

export const getUserAccessName = () => {
    const userName = localStorage.getItem("accessName");
    return userName || "";
}