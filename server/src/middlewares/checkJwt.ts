import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import {promisify} from 'util';

export default async (request: Request, response: Response, next: NextFunction) => {
    
    const bearerToken = request.headers.authorization;
    
    if(!bearerToken) {
      return response.status(401).json({error: 'Token not provided'});
    }
    
    const [, token] = bearerToken.split(' ');
    
    try {
      const decoded:any = await promisify(jwt.verify)(token, authConfig.secret);

      request.userId = decoded.id;
      
      return next();
    } catch (error) {      
      response.status(401).json({ error: error});
      return;
    }
  
  };