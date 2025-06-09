import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '@client/roleClient'

export class RoleService {
    async getRoles(page = 0, size = 10) {
        try {
            const response = await getRoles(page, size);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching roles: ${error.message}`);
        }
    }

    async getRoleById(id) {
        try {
            const response = await getRoleById(id);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching role with ID ${id}: ${error.message}`);
        }
    }

    async createRole(roleDto) {
        try {
            const response = await createRole(roleDto);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating role: ${error.message}`);
        }
    }

    async updateRole(id, roleDto) {
        try {
            const response = await updateRole(id, roleDto);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating role with ID ${id}: ${error.message}`);
        }
    }

    async deleteRole(id) {
        try {
            const response = await deleteRole(id);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting role with ID ${id}: ${error.message}`);
        }
    }
}