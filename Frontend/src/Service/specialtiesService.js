import { getSpecialties, getSpecialtyById, createSpecialty, updateSpecialty, deleteSpecialty } from '@client/specialtiesClient';


export const GET_ALL_SPECIALTIES = async (page = 0, size = 10) => {
    try {
        const response = await getSpecialties(page, size);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching specialties: ${error.message}`);
    }
}

export const GET_SPECIALTY_BY_ID = async (id) => {
    try {
        const response = await getSpecialtyById(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching role with ID ${id}: ${error.message}`);
    }
}

export const ADD_SPECIALTY = async (specialtiesDto) => {
    try {
        const response = await createSpecialty(specialtiesDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating specialty: ${error.message}`);
    }
}

export const UPDATE_SPECIALTY = async (id, specialtiesDto) => {
    try {
        const response = await updateSpecialty(id, specialtiesDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating specialty with ID ${id}: ${error.message}`);
    }
}

export const DELETE_SPECIALTY = async (id) => {
    try {
        const response = await deleteSpecialty(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting specialty with ID ${id}: ${error.message}`);
    }
}