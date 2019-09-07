module.exports = app =>{
    const {existsOrError} = app.api.validation

    const save = async (req, res) =>{
        const carousel = {...req.body}

        if(req.params.id) carousel.id = req.params.id

        try{
            existsOrError(carousel.description, 'descrição não informada')
            existsOrError(carousel.url, 'link não informado')
            existsOrError(carousel.title, 'titulo não informado')
        }
        catch(err){
            res.status(500).send(err)
        }
        
        if(carousel.id){
            app.db('carousel')
            .update(carousel)
            .where({id: carousel.id})
            .then(data => res.status(204).send(data))
            .catch(err => res.status(500).send(err))
        }
        else{
            app.db('carousel')
                .insert(carousel)
                .then(data => res.status(201).send(data))
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('carousel').del()
                .where({id: req.params.id})
            existsOrError(rowsDeleted, 'noticia não encontrada')

            res.status(204).send
        }
        catch(msg){
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('carousel')
            .then(carousel => res.json(carousel))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('carousel')
            .where({id: req.params.id})
            .first()
            .then(house => res.json(house))
    }

    return {save, remove, getById, get}
}