import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetcher = async (url = '', options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}) => {
    try {
        const response = await axios(url, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};
