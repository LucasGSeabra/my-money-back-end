import jwt from 'jsonwebtoken'

function auth(request, response, next) {
    if(request.method === 'OPTIONS') {
        next()
    } else {
        const token = request.body.token || request.query.token || request.headers['Authorization']
        if(!token) {
            return response.status(403).send({ errors: ['No token provided'] })
        }
        jwt.verify(token, process.env.AUTH_SECRET, (error, decoded) => {
            if(error) {
                return response.status(403).send({
                    errors: ['Failed to authenticate token']
                })
            } else {
                next()
            }
        })
    }
}

export default auth