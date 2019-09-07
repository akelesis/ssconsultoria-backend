module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const newsPic = { ...req.body }

        

        /* try {
            existsOrError(newsPic.idNews, 'Imóvel não informado')
            existsOrError(newsPic.url, 'Não existe imagem para ser salva')
        }
        catch (err) {
            
            res.status(500).send(err)
        } */

        app.db('news-pics')
            .insert(newsPic[0])
            .then(() => {
                res.status(204).send()
            })
            .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da imagem é inexistente!')

            const rowsDeleted = await app.db('news-pics').del()
                .where({ id: req.params.id })
            existsOrError(rowsDeleted, 'Imagem não encontrada')

            res.status(204).send
        }
        catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('news-pics')
            .then(houses => res.json(houses))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('news-pics')
            .where({ idNews: req.params.id })
            .first()
            .then(house => res.json(house))
    }

    return { save, remove, getById, get }
}