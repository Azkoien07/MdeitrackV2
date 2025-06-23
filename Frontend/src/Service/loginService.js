import axios from 'axios';

export const login = async (email, password) => {
    const response = await axios.post('http://localhost:8081/auth/login', {
        email,
        password
    });

    return response.data;
};
