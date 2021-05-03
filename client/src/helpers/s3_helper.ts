import dash_api from "./dash_api"

export const getPreSignedUrl = async (url: string) => {
    return dash_api.post(`/file/signedUrl`, { url }).then(res => {
        return res.data.url;
    });
}