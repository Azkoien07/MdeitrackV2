import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '@client/roleClient'

export const GET_ALL_ROLES = async (page = 0, size = 10) => {
    try {
        const response = await getRoles(page, size);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching roles: ${error.message}`);
    }
};

export const GET_ROLE_BY_ID = async (id) => {
    try {
        const response = await getRoleById(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching role with ID ${id}: ${error.message}`);
    }
};

export const ADD_ROLE = async (roleDto) => {
    try {
        const response = await createRole(roleDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating role: ${error.message}`);
    }
};

export const UPDATE_ROLE = async (id, roleDto) => {
    try {
        const response = await updateRole(id, roleDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating role with ID ${id}: ${error.message}`);
    }
};

export const DELETE_ROLE = async (id) => {
    try {
        const response = await deleteRole(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting role with ID ${id}: ${error.message}`);
    }
};