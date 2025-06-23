import { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '@client/doctorClient';

export const GET_ALL_DOCTORS = async (page = 0, size = 10) => {
    try {
        const response = await getDoctors(page, size);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching doctors: ${error.message}`);
    }
};

export const GET_DOCTOR_BY_ID = async (id) => {
    try {
        const response = await getDoctorById(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching doctor with ID ${id}: ${error.message}`);
    }
};

export const ADD_DOCTOR = async (doctorDto) => {
    try {
        const response = await createDoctor(doctorDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating doctor: ${error.message}`);
    }
};

export const UPDATE_DOCTOR = async (id, doctorDto) => {
    try {
        const response = await updateDoctor(id, doctorDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating doctor with ID ${id}: ${error.message}`);
    }
};

export const DELETE_DOCTOR = async (id) => {
    try {
        const response = await deleteDoctor(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting doctor with ID ${id}: ${error.message}`);
    }
};