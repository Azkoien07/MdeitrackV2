import api from '@lib/axios';

export const getRoles = (page = 0, size = 10) =>
    api.get(`/user`, { params: { page, size } });

export const getRoleById = (id) =>
    api.get(`/user/find/${id}`);

export const createRole = (userDto) =>
    api.post(`/user/add`, userDto);

export const updateRole = (id, userDto) =>
    api.put(`/user/update/${id}`, userDto);

export const deleteRole = (id) =>
    api.delete(`/user/delete/${id}`);