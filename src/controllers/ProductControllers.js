const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class ProductControllers {
    async create(request, response) {
        const { title, price, category_id } = request.body;

        if (!title || !price || !category_id) {
            throw new AppError(
                'Insira todos os dados obrigatórios do produto.'
            );
        }

        await knex('products').insert({
            title,
            price,
            category_id,
        });

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params;

        const product = await knex('products').where({ id }).first();

        return response.json({
            ...product,
        });
    }

    async index(request, response){
        let products;

        products = await knex("products").select(['products.title', 'products.category_id', 'products.price', 'products.id'])

        return response.json([...products])
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('products').where({ id }).delete();

        return response.json();
    }
}

module.exports = ProductControllers;
