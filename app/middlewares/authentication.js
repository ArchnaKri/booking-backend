const jwt = require('jsonwebtoken')
const _ = require('lodash')
const authenticateUser = (req, res, next) => {
    let token = req.headers['authorization']
    if(!token) {
        return res.status(401).json({ errors: 'authentication failed'})
    }
    token = token.split(' ')[1]
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET) 
        req.user = _.pick(tokenData, ['id'])
        next()
    } catch(e) {
        res.status(401).json({ errors: 'authentication failed'})
    }
}

module.exports = {
    authenticateUser
}
/*
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  };
  
  export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };*/