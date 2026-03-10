export const users = {
    type: 'object',
    required: ['page', 'per_page', 'total', 'total_pages', 'data'],
    properties: {
        page: { type: 'number' },
        per_page: { type: 'number' },
        total: { type: 'number' },
        total_pages: { type: 'number' },
        data: {
        type: 'array',
        items: {
            type: 'object',
            required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
            properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            avatar: { type: 'string' }
            }
        }
        }
    }
};