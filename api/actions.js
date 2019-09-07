module.exports = app =>{
    const {existsOrError} = app.api.validation

    const save = async (req, res) =>{
        const actionInfo = {...req.body}

        
        
        if(req.params.id) actionInfo.id = req.params.id

        try{
            
            existsOrError(actionInfo.title, 'Titulo não informado!')
            existsOrError(actionInfo.description, 'Descrição do imóvel não informada')
            existsOrError(actionInfo.mainPic, 'Imagem prinicipal do imóvel não informada!')
        }
        catch(err){
            res.status(400).send(err)
        }
        
        if(actionInfo.id){
            app.db('actions')
                .update(actionInfo)
                .where({id: actionInfo.id})
                .then(data => res.status(201).send(data))
                .catch(err => res.status(500).send(err))
        }
        else{
            app.db('actions')
                .insert(actionInfo)
                .then(data => res.status(201).send(data))
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try{
            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('actions').del()
                .where({id: req.params.id})
            existsOrError(rowsDeleted, 'Imóvel não encontrado')

            res.status(204).send
        }
        catch(msg){
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('actions')
            .then(actions => res.json(actions))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('actions')
            .where({id: req.params.id})
            .first()
            .then(action => res.json(action))
    }

    return {save, remove, getById, get}
}