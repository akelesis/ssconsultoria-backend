module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const housePics = { ...req.body }
        const picsInfoVector = []

        for(let i = 0; i < Object.entries(housePics).length; i ++){
            picsInfoVector.push(housePics[i])
        }
        
        app.db('action-pics')
            .insert(picsInfoVector)
            .then(() => res.status(204).send())
            .catch(err => res.status(500).send(err))
        
    }

    const remove = async (req, res) => {
        

        try {

            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('action-pics').del()
                .where({ idHouse: req.params.id })
            existsOrError(rowsDeleted, 'Imagens não encontradas')

            res.status(204).send
        }
        catch (msg) {
            console.log(msg)
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('action-pics')
            .then(houses => res.json(houses))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        console.log('chegou aqui')
        app.db('action-pics')
            .where({ idAction: req.params.id })
            .then(house => {
                console.log(req.params.id)
                res.json(house)
            })
    }

    return { save, remove, getById, get }
}