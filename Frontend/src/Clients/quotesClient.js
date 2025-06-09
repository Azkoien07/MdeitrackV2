import api from '@lib/axios';

export const getPatients = (page = 0, size = 10) =>
    api.get(`/quotes`, { params: { page, size } });

export const getPatientById = (id) =>
    api.get(`/quotes/find/${id}`);

export const createPatient = (quotesDto) =>
    api.post(`/quotes/add`, quotesDto);

export const updatePatient = (id, quotesDto) =>
    api.put(`/quotes/update/${id}`, quotesDto);

export const deletePatient = (id) =>
    api.delete(`/quotes/delete/${id}`);