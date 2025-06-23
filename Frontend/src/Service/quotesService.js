import { getQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } from '@client/quotesClient'


export const GET_ALL_QUOTES = async (page = 0, size = 10) => {
    try {
        const response = await getQuotes(page, size);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching quotes: ${error.message}`);
    }
}

export const QUOTE_BY_ID = async (id) => {
    try {
        const response = await getQuoteById(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching quote with ID ${id}: ${error.message}`);
    }
}

export const ADD_QUOTE = async (quoteDto) => {
    try {
        const response = await createQuote(quoteDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating quote: ${error.message}`);
    }
}

export const UPDATE_QUOTE = async (id, quoteDto) => {
    try {
        const response = await updateQuote(id, quoteDto);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating quote with ID ${id}: ${error.message}`);
    }
}

export const DELETE_QUOTE = async (id) => {
    try {
        const response = await deleteQuote(id);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting quote with ID ${id}: ${error.message}`);
    }
}