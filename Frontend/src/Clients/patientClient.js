import api from '@lib/axios';

export const getPatients = (page = 0, size = 10) =>
    api.get(`/patient`, { params: { page, size } });

export const getPatientById = (id) =>
    api.get(`/patient/find/${id}`);

export const createPatient = (patientDto) =>
    api.post(`/patient/add`, patientDto);

export const updatePatient = (id, patientDto) =>
    api.put(`/patient/update/${id}`, patientDto);

export const deletePatient = (id) =>
    api.delete(`/patient/delete/${id}`);