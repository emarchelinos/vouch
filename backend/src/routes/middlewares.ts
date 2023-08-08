import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { IResponse } from "../types/common"

export const logger = (request: Request, response: Response, next: NextFunction) => {
    console.log({
      timestamp   : Date.now(),
      method      : request.method,
      url         : request.url,
      body        : request.body
    })
    next()
}

export const errorHandler = (err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
    const payload :IResponse = {
        message : "Apologize, server error!",
        data    : err
    }
    res.status(500).send(payload)
}

export const notFoundHandler = ( req:Request, res:Response) =>  {
    const payload :IResponse = {
        message : "Not found",
        data    : {}
    }
    res.status(400).json(payload)
}