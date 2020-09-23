import { Request, Response } from "express";
import db from "../database/connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../config/auth';

export default class SessionController {
    async create(request: Request, response: Response) {

        const trx = await db.transaction();

        try {
            const { email, password } = request.body;

            const users = await trx('users').where('email', email);

            if(users.length === 0) {
                trx.rollback();
                return response.status(400).json({error: 'User not found'});
            }

            const passwordHash = users[0].passwordHash;

            if(!(await bcrypt.compare(password, passwordHash))) {
                trx.rollback();
                return response.status(400).json({error: "Wrong password!"})
            }

            const id = users[0].id;
            const token = jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            });

            return response.json({
                auth: true,
                token: token
            })
            
        } catch(err) {
            trx.rollback();
            return response.status(400).json({
                error: err
            });
        }
    }
}

