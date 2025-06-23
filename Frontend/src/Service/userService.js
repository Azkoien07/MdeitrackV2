import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@client/userClient';


export const GET_ALL_USERS = async (page = 0, size = 10) => {
    try {
        const response = await getUsers(page, size);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

export const GET_USER_BY_ID = async (id) => {
    try {
        const response = await getUserById(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user with ID ${id}: ${error.message}`);
    }
}

export const ADD_USER = async (userDto) => {
    try {
        const response = await createUser(userDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

export const UPDATE_USER = async (id, userDto) => {
    try {
        const response = await updateUser(id, userDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user with ID ${id}: ${error.message}`);
    }
}

export const DELETE_USER = async (id) => {
    try {
        const response = await deleteUser(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
    }
}