module.exports = app =>{
    const {existsOrError} = app.api.validation

    const save = async (req, res) =>{
        const newsInfo = {...req.body}

        if(req.params.id) newsInfo.id = req.params.id

        try{
            existsOrError(newsInfo.date, 'Data não informada não informada')
            existsOrError(newsInfo.description, 'descrição não informada')
            existsOrError(newsInfo.link, 'link não informado')
        }
        catch(err){
            res.status(500).send(err)
        }
        
        if(newsInfo.id){
            app.db('news')
            .update(newsInfo)
            .where({id: newsInfo.id})
            .then(data => res.status(204).send(data))
            .catch(err => res.status(500).send(err))
        }
        else{
            app.db('news')
                .insert(newsInfo)
                .then(data => res.status(201).send(data))
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('news').del()
                .where({id: req.params.id})
            existsOrError(rowsDeleted, 'noticia não encontrada')

            res.status(204).send
        }
        catch(msg){
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('news')
            .then(news => res.json(news))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('news')
            .where({id: req.params.id})
            .first()
            .then(house => res.json(house))
    }

    return {save, remove, getById, get}
}