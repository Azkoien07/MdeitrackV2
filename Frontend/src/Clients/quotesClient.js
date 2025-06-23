import api from '@lib/axios';

export const getQuotes = (page = 0, size = 10) =>
    api.get(`/quotes`, { params: { page, size } });

export const getQuoteById = (id) =>
    api.get(`/quotes/find/${id}`);

export const createQuote = (quotesDto) =>
    api.post(`/quotes/add`, quotesDto);

export const updateQuote = (id, quotesDto) =>
    api.put(`/quotes/update/${id}`, quotesDto);

export const deleteQuote = (id) =>
    api.delete(`/quotes/delete/${id}`);