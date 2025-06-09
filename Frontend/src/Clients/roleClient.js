import api from '@lib/axios';

export const getRoles = (page = 0, size = 10) =>
    api.get(`/role`, { params: { page, size } });

export const getRoleById = (id) =>
    api.get(`/role/find/${id}`);

export const createRole = (roleDto) =>
    api.post(`/role/add`, roleDto);

export const updateRole = (id, roleDto) =>
    api.put(`/role/update/${id}`, roleDto);

export const deleteRole = (id) =>
    api.delete(`/role/delete/${id}`);