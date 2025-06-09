import { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '@Clients/doctorClient';

export class DoctorService {
    async getDoctors(page = 0, size = 10) {
        try {
            const response = await getDoctors(page, size);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching doctors: ${error.message}`);
        }
    }

    async getDoctorById(id) {
        try {
            const response = await getDoctorById(id);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching doctor with ID ${id}: ${error.message}`);
        }
    }

    async createDoctor(doctorDto) {
        try {
            const response = await createDoctor(doctorDto);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating doctor: ${error.message}`);
        }
    }

    async updateDoctor(id, doctorDto) {
        try {
            const response = await updateDoctor(id, doctorDto);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating doctor with ID ${id}: ${error.message}`);
        }
    }

    async deleteDoctor(id) {
        try {
            const response = await deleteDoctor(id);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting doctor with ID ${id}: ${error.message}`);
        }
    }
}