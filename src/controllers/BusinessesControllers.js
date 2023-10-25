const knex = require('../database/knex');
const sqliteConnection = require('../database/sqlite');
const AppError = require('../utils/AppError');

class BusinessesControllers {
    async create(request, response) {
        const { title, description, negotiated_value, status, notes } =
            request.body;

        const user_id = request.user.id;

        const [business_id] = await knex('businesses').insert({
            title,
            user_id,
            description,
            negotiated_value,
            status,
        });

        if (notes) {
            const notesInsert = notes.map((note) => {
                return {
                    business_id,
                    title: note.title,
                    description: note.description,
                    user_id,
                };
            });

            await knex('notes').insert(notesInsert);
        }

        if (!title) {
            throw new AppError('Insira um título!');
        }

        return response.json();
    }

    async update(request, response) {
        const { title, description, negotiated_value, status } = request.body;
        const { id } = request.params;
        console.log('titulo: ', title);
        console.log('id do negocio: ', id);
        const database = await sqliteConnection();

        const business = await database.get(
            'SELECT * FROM businesses WHERE id = (?)',
            [id]
        );

        business.title = title ?? business.title;
        business.description = description ?? business.description;
        business.negotiated_value =
            negotiated_value ?? business.negotiated_value;
        business.status = status ?? business.status;

        await database.run(
            `UPDATE businesses SET 
            title = ?,
            description = ?,
            negotiated_value = ?,
            status = ?
            WHERE id = ?
            `,
            [
                business.title,
                business.description,
                business.negotiated_value,
                business.status,
                id,
            ]
        );

        return response.json();
    }

    async show(request, response) {
        const { id } = request.params;

        const business = await knex('businesses').where({ id }).first();

        return response.json({
            ...business,
        });
    }

    async index(request, response) {
        try {
            const categories = ['contact', 'follow-up', 'negotiation'];

            const categorizedBusinesses = {};

            for (const category of categories) {
                categorizedBusinesses[category] = {
                    title: category,
                    cards: [],
                };
            }

            for (const category of categories) {
                const businesses = await knex('businesses')
                    .select([
                        'businesses.id',
                        'businesses.user_id',
                        'businesses.title',
                        'businesses.description',
                        'businesses.status',
                        'businesses.negotiated_value',
                        'businesses.created_at',
                    ])
                    .where('status', category)
                    .orderBy('businesses.created_at');

                for (const business of businesses) {
                    const notes = await knex('notes')
                        .select([
                            'notes.id',
                            'notes.title',
                            'notes.description',
                        ])
                        .where('business_id', business.id);
                    const user = await knex('users')
                        .select('users.name')
                        .where({ id: business.user_id });
                    const businessData = {
                        id: business.id,
                        content: business.title,
                        description: business.description,
                        category: business.status,
                        price: business.negotiated_value,
                        created_at: business.created_at,
                        notes: notes.map((note) => ({
                            id: note.id,
                            title: note.title,
                            description: note.description,
                        })),
                        user_name: user,
                    };

                    categorizedBusinesses[category].cards.push(businessData);
                }
            }

            const responseData = Object.values(categorizedBusinesses);

            return response.json(responseData);
        } catch (error) {
            console.error('Erro ao buscar dados do banco de dados:', error);
            return response
                .status(500)
                .json({ error: 'Erro interno do servidor' });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex('businesses').where({ id }).delete();

        return response.json();
    }
}

module.exports = BusinessesControllers;
