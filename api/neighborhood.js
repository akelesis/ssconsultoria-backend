module.exports = app =>{
    const {existsOrError} = app.api.validation

    const save = (req, res) =>{
        const neigborhood = {...req.body}

        if(req.params.id) neigborhood.id = req.params.id

        try{
            existsOrError(neigborhood.name, 'nome não informado')
        }
        catch(err){
            res.status(500).send(err)
        }

        if(neigborhood.id){
            app.db('neighborhoods')
                .update(neigborhood)
                .where({id: neigborhood.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else{
            app.db('neighborhoods')
                .insert(neigborhood)
                .then(data => {
                    return res.status(201).send(data[0].toString())
                })
                .catch(err => res.status(500).sendStatus(err))
        }
    }

    const remove = async (req, res) => {
        try{
            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('neighborhoods').del()
                .where({id: req.params.id})
            existsOrError(rowsDeleted, 'noticia não encontrada')

            res.status(204).send
        }
        catch(msg){
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('neighborhoods')
            .then(neighborhood => res.json(neighborhood))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('neighborhoods')
            .where({id: req.params.id})
            .first()
            .then(house => res.json(house))
    }

    return {save, remove, getById, get}
}