//const auth = require('./controllers/login');

const localStrategy = require('passport-local').Strategy

function initialize(passport){
    passport.use(new localStrategy(auth.login))
    passport.serializeUser((user,done) => {})
    passport.deserializeUser((user,done) => {})
}
module.exports = initialize