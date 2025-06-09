import api from '@lib/axios';

export const getDoctors = (page = 0, size = 10) =>
    api.get(`/doctor`, { params: { page, size } });

export const getDoctorById = (id) =>
    api.get(`/doctor/find/${id}`);

export const createDoctor = (doctorDto) =>
    api.post(`/doctor/add`, doctorDto);

export const updateDoctor = (id, doctorDto) =>
    api.put(`/doctor/update/${id}`, doctorDto);

export const deleteDoctor = (id) =>
    api.delete(`/doctor/delete/${id}`);