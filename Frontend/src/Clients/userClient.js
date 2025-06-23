import api from '@lib/axios';

export const getUsers = (page = 0, size = 10) =>
    api.get(`/user`, { params: { page, size } });

export const getUserById = (id) =>
    api.get(`/user/find/${id}`);

export const createUser = (userDto) =>
    api.post(`/user/add`, userDto);

export const updateUser = (id, userDto) =>
    api.put(`/user/update/${id}`, userDto);

export const deleteUser = (id) =>
    api.delete(`/user/delete/${id}`);