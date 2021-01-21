import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from './user.js'

const emailRegex = /\S+@\S+.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (response, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return response.status(400).json({ errors })
}

export function login(require, response, next) {
    const email = require.body.email || ''
    const password = require.body.password || ''

    User.findOne({ email }, (error, user) => {
        if(error) {
            return sendErrorsFromDB(response, error)
        } else if(user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, process.env.AUTH_SECRET, {
                expiresIn: '1 day'
            })
            const { name, email } = user
            response.json({ name, email, token })
        } else {
            return response.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

export function validateToken(require, response, next) {
    const token = require.body.token || ''
    jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
        return response.status(200).send({ valid: !error })
    })
}

export function signUp(require, response, next) {
    const name = require.body.name || ''
    const email = require.body.email || ''
    const password = require.body.password || ''
    const confirmPassword = require.body.confirm_password || ''

    if(!email.match(emailRegex)) {
        return response.status(400).send({ errors: ['O e-mail informado está inválido'] })
    }

    if (!password.match(passwordRegex)) {
        return response.status(400).send({
            errors: [
                'A senha precisa conter: uma letra maiúscula, uma letra minúscula, um número e um caracter especial'
            ]
        })
    }

    const salt = bcrypt.genSaltSynch()
    const passwordHash =  bcrypt.hashSync(password, salt)

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    User.findOne({ email }, (error, user) => {
        if(error) {
            return sendErrorsFromDB(response, error)
        } else if (user) {
            return response.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ name, email, password: passwordHash })

            newUser.save(error => {
                if(error) {
                    return sendErrorsFromDB(response, error)
                } else { 
                    login(require, response, next)
                }
            })
        }
    })
}