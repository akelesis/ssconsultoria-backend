const bcrypt = require('bcryptjs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const admin = { ...req.body }
        if(req.params.id) admin.id = req.params.id

        

        try{
            existsOrError(admin.user, 'Nome não especificado')
            existsOrError(admin.password, 'Senha não especificada')
            
            const adminFromDB = await app.db('admin').where({user: admin.user}).first()
            if(!admin.id){
                notExistsOrError(adminFromDB, 'Usuário já cadastrado!')
            }
        }
        catch(msg){
            console.log(msg)
            return res.status(400).send(msg)
        }

        admin.password = encryptPassword(admin.password)
        
        if(admin.id){
            app.db('admin')
                .update(admin)
                .where({id: admin.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        else{
            app.db('admin')
                .insert(admin)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const get = (req, res) => {
        app.db('admin')
            .select('id', 'name', 'email', 'telephone', 'city', 'neighborhood', 'street', 'number', 'cpf', 'birth')
            .then(admin => res.json(admin))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        await app.db('admin')
            .where({id: req.params.id})
            .first()
            .then(admin => res.json(admin))
            .catch(err => res.status(500).send(err))
    }

    const saveChanges = (req, res) => {
        const admin = {...req.body}
        console.log(admin.name)
        if(req.params.id){
            console.log('encontrado! ' + req.params.id)
        }else{
            console.log('error!')
        }

        app.db('admin')
            .update(admin)
            .where({id: admin.id})
            .then(res.status(204).send())
            .catch(res.status(500).send())
    }

    return {save, get, getById, saveChanges}
}