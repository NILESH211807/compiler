import { fetcher } from "./fetch";

export const getShareData = async (id) => {
    try {
        const result = await fetcher(`/api/code/share/${id}`);
        return result;
    } catch (error) {
        return error?.response?.data || error;
    }
}