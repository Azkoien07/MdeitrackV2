import api from '@lib/axios';

export const getSpecialties = (page = 0, size = 10) =>
    api.get(`/specialties`, { params: { page, size } });

export const getSpecialtyById = (id) =>
    api.get(`/specialties/find/${id}`);

export const createSpecialty = (specialtiesDto) =>
    api.post(`/specialties/add`, specialtiesDto);

export const updateSpecialty = (id, specialtiesDto) =>
    api.put(`/specialties/update/${id}`, specialtiesDto);

export const deleteSpecialty = (id) =>
    api.delete(`/specialties/delete/${id}`);