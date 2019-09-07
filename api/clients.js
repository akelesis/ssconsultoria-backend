module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const client = { ...req.body }


        if (req.params.id) houseInfo.id = req.params.id

        try {
            existsOrError(client.name, 'Nome do dono do imóvel não informado')
            existsOrError(client.telephone, 'Telefone do dono do imóvel não informada')
            existsOrError(client.email, 'email do dono do imóvel não informada')

        }
        catch (err) {
            res.status(500).send(err)
        }

        if (client.id) {
            app.db('clients')
                .update(client)
                .where({ id: client.id })
                .then(_ => res.sendStatus(204))
                .catch(err => res.status(500).send(err))
        }
        else {
            app.db('clients')
                .insert(client)
                .then(data => {
                    return res.status(200).send(data[0].toString())
                })
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('clients').del()
                .where({ id: req.params.id })
            existsOrError(rowsDeleted, 'Cliente não encontrado')

            res.status(204).send
        }
        catch (msg) {
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('clients')
            .then(clients => res.json(clients))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clients')
            .where({ id: req.params.id })
            .first()
            .then(client => res.json(client))
    }

    return { save, remove, getById, get }
}

