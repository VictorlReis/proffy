import { Request, Response } from "express";
import db from "../database/connection";
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

interface User {
    name: string,
    email: string,
    passwordHash: string,
    avatar: string,
    whatsapp: string,
    bio: string
}
export default class UsersController {
    async create(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(4),
            avatar: Yup.string(),
            whatsapp: Yup.string().required(),
            bio: Yup.string().required()
        });

        if(!(await schema.isValid(request.body))) {
            return response.status(401).json({error: 'Validation fails'})
        }

        const trx = await db.transaction();
        
        try {
            const {
                name,
                email,
                password,
                avatar,
                whatsapp,
                bio
            } = request.body;
            
            const userExists = await trx('users').where('email', email);
            
            if(userExists.length > 0) {
                return response.status(400).json({error: 'User already exists'});
            }

            const passwordHash = await bcrypt.hash(password, 8);            
            
            await trx('users').insert({
                name,
                email,
                passwordHash,
                avatar,
                whatsapp,
                bio
            })
            
            trx.commit();

        } catch (err) {
            trx.rollback();
            return response.status(400).json({
                error: err            
            });
        }     
        
        return response.status(201).send();
    }

    async update(request: Request, response: Response) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(4),
            newPassword: Yup.string().required().min(4)
                .when('oldPassword', (oldPassword: string, field : any) => 
                    oldPassword ? field.required() : field),
            avatar: Yup.string(),
            whatsapp: Yup.string(),
            bio: Yup.string()
        });

        if(!(await schema.isValid(request.body))) {
            return response.status(401).json({error: 'Validation fails'})
        }

        const trx = await db.transaction();
        
        try {
            const user:User[] = await trx('users').where('id', request.userId);
            
            const {
                name,
                email, 
                oldPassword,
                newPassword,
                avatar,
                whatsapp,
                bio
            } = request.body;

            if(email !== user[0].email){
                const userExists = await trx('users').where('email', email);
            
                if(userExists.length > 0) {
                    return response.status(400).json({error: 'Email already exists'});
                }                
            }

            if(oldPassword && !(await bcrypt.compare(oldPassword, user[0].passwordHash))) {
                return response.status(401).json({error: "Password doesn't match"})
            }

            const userUpdate = await trx('users')
                .where('id', request.userId)
                .update({
                    name: name,
                    email: email, 
                    passwordHash: await bcrypt.hash(newPassword, 8),
                    avatar: avatar,
                    whatsapp: whatsapp,
                    bio: bio
                })
                

                trx.commit();
                return response.status(200).json(userUpdate);
            
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        } 
    }
}