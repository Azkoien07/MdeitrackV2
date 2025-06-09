import api from '@lib/axios';

export const getRoles = (page = 0, size = 10) =>
    api.get(`/specialties`, { params: { page, size } });

export const getRoleById = (id) =>
    api.get(`/specialties/find/${id}`);

export const createRole = (specialtiesDto) =>
    api.post(`/specialties/add`, specialtiesDto);

export const updateRole = (id, specialtiesDto) =>
    api.put(`/specialties/update/${id}`, specialtiesDto);

export const deleteRole = (id) =>
    api.delete(`/specialties/delete/${id}`);