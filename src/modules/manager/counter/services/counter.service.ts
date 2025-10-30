import { counterApi } from '../api/counter.api';

export const counterService = {
    getById: async (id: string) => {
        const res = await counterApi.getById(id);
        return res.data.data;
    },
};
