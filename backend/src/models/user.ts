// provide UserModel class (abstraction) to interact with table 'users' in postgresql
// all crud operation go through this file

import pool from '../config/database'; // to run sql queries
import {User, CreateUserRequest } from '../types/user'; // ts enforce correct data shape
import { hashPassword } from '../utils/auth'; 

export class UserModel {

    static async findByUsername(username: string): Promise<User | null> {
        const query = `
        SELECT id, username, email, password_hash, full_name, avatar_url, role, created_at
        FROM users
        WHERE user = $1
        `;
        // $1 = parameterized query holder, prevent injection
        const result = await pool.query(query, [username]);
        return result.rows[0] || null;
    }

    static async findByEmail(email: string): Promise<User | null> {
        const query = `
        SELECT id, username, email, password_hash, full_name, avatar_url, role, created_at
        FROM users
        WHERE email = $1
        `;
        // $1 = parameterized query holder, prevent injection
        const result = await pool.query(query, [email]);
        return result.rows[0] || null;
    }

    static async create(userData: CreateUserRequest): Promise<User> {
        // 1. wait to hash pw
        const hashedPassword = await hashPassword(userData.password);

        // 2. store into db by inserting
        const query = `
        INSERT INTO users(username, email, password_hash, full_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, email, full_name, avatar_url, role, created_at
        `;
        // 3. return inserted row
    
        const values = [
            userData.username,
            userData.email,
            hashedPassword,
            userData.full_name
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // retrieve, a user, by primary key id
    static async findById(id: number): Promise<User | null> {
        const query = `
        SELECT id, username, email, password_hash, full_name, avatar_url, role, created_at
        FROM users
        WHERE id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}