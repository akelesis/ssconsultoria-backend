module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const housePics = { ...req.body }
        const picsInfoVector = []

        for(let i = 0; i < Object.entries(housePics).length; i ++){
            picsInfoVector.push(housePics[i])
        }
        
        app.db('houses-pics')
            .insert(picsInfoVector)
            .then(() => {
                
                res.status(204).send()
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
        
    }

    const remove = async (req, res) => {
        

        try {

            existsOrError(req.params.id, 'Código é inexistente!')

            const rowsDeleted = await app.db('houses-pics').del()
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
        app.db('houses-pics')
            .then(houses => res.json(houses))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('houses-pics')
            .where({ idHouse: req.params.id })
            /* .first() */
            .then(house => {
                res.json(house)
            })
    }

    return { save, remove, getById, get }
}