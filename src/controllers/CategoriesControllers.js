const knex = require('../database/knex');

class CategoriesControllers {
    async create(request, response) {
        const { title } = request.body;

        await knex('categories').insert({ title });

        return response.json();
    }

    async index(request, response) {
        const { title } = request.body;
        let categories;

        categories = await knex('categories')
            .select(['categories.id', 'categories.title'])
            .whereLike('categories.title', `%${title}%`)
            .groupBy('categories.id')
            .orderBy('categories.title');

        return response.json({
            ...categories,
        });
    }
}

module.exports = CategoriesControllers;
