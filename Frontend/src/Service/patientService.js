import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '@client/patientClient'

export const GET_ALL_PATIENTS = async (page = 0, size = 10) => {
    try {
        const response = await getPatients(page, size);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching patients: ${error.message}`);
    }
}

export const PATIENT_BY_ID = async (id) => {
    try {
        const response = await getPatientById(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching patient with ID ${id}: ${error.message}`);
    }
}

export const ADD_PATIENT = async (patientDto) => {
    try {
        const response = await createPatient(patientDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating patient: ${error.message}`);
    }
}

export const UPDATE_PATIENT = async (id, patientDto) => {
    try {
        const response = await updatePatient(id, patientDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating patient with ID ${id}: ${error.message}`);
    }
}

export const DELETE_PATIENT = async (id) => {
    try {
        const response = await deletePatient(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting patient with ID ${id}: ${error.message}`);
    }
}