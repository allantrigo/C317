import jwt = require('jsonwebtoken')
import { Request, Response } from 'express'

export function auth (req: Request, res: Response, next: Function) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'ENCRYPT') as {
      userId: string
    }
    const id = decodedToken.userId
    if (req.body.id && req.body.id !== id) {
      throw 'Invalid Session'
    } else {
      res.locals.id = id
      next()
    }
  } catch {
    res.status(401).json({
      error: "Unauthorized"
    })
  }
}
