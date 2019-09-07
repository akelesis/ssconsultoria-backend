const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const secret = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(secret, (payload, done) => {
        app.db('clients')
            .where({id: payload.id})
            .first()
            .then(client => done(null, client ? {...payload} : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}