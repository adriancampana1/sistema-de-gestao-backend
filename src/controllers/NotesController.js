const knex = require('../database/knex');

const AppError = require('../utils/AppError');

class NotesController {
    async create(request, response) {
        const { title, description } = request.body;
        const { business_id } = request.params;
        const user_id = request.user.id;

        if (!title) {
            throw new AppError('Insira o título e uma descrição da nota.');
        }

        await knex('notes').insert({
            user_id,
            business_id,
            title,
            description,
        });

        return response.json({ title, description, business_id });
    }

    async index(request, response) {
        const { business_id } = request.params;
        let notes;

        notes = await knex('notes')
            .select(['notes.business_id', 'notes.title'])
            .whereLike('notes.business_id', `%${business_id}%`)
            .groupBy('notes.id')
            .orderBy('notes.title');

        return response.json({
            ...notes,
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('notes').where({ id }).delete();

        return response.json();
    }
}

module.exports = NotesController;
