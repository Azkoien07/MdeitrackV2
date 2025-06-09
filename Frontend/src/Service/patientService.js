import { getPatients, getPatientById, createPatient, updatePatient, deletePatient } from '@clients/patientClient'

export class PatientService {
    async getPatients(page = 0, size = 10) {
        try {
            const response = await getPatients(page, size);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching patients: ${error.message}`);
        }
    }

    async getPatientById(id) {
        try {
            const response = await getPatientById(id);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching patient with ID ${id}: ${error.message}`);
        }
    }

    async createPatient(patientDto) {
        try {
            const response = await createPatient(patientDto);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating patient: ${error.message}`);
        }
    }

    async updatePatient(id, patientDto) {
        try {
            const response = await updatePatient(id, patientDto);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating patient with ID ${id}: ${error.message}`);
        }
    }

    async deletePatient(id) {
        try {
            const response = await deletePatient(id);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting patient with ID ${id}: ${error.message}`);
        }
    }
}