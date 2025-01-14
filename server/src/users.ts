import { Controller, Get, Post, Delete, Put, Body, Param, Module, Injectable } from '@nestjs/common';
import pool from './db';

@Injectable()
class UsersService {
    async findAll(): Promise<any> {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    }

    async create(user: {
        email: string;
        surname: string;
        first_name: string;
        second_name?: string;
        password: string
    }): Promise<any> {
        const { email, surname, first_name, second_name, password } = user;
        const [result] = await pool.execute(
            'INSERT INTO users (email, surname, first_name, second_name, password) VALUES (?, ?, ?, ?, ?)',
            [email, surname, first_name, second_name, password],
        );
        return { id: (result as any).insertId, ...user };
    }

    async delete(id: number): Promise<void> {
        const [result] = await pool.execute('DELETE FROM users WHERE id_user = ?', [id]);
        if ((result as any).affectedRows === 0) {
            throw new Error(`User with ID ${id} not found`);
        }
    }

    async update(user: {
        email: string;
        surname: string;
        first_name: string;
        second_name?: string | null;
        password: string;
        id_user: number;
    }): Promise<any> {
        const { email, surname, first_name, second_name, password, id_user } = user;
        const [result] = await pool.execute(
            'UPDATE users SET email = ?, surname = ?, first_name = ?, second_name = ?, password = ? WHERE id_user = ?',
            [email, surname, first_name, second_name, password, id_user]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error(`User with ID ${id_user} not found`);
        }
        const [updatedUser] = await pool.execute('SELECT * FROM users WHERE id_user = ?', [id_user]);
        return updatedUser[0];
    }
}

@Controller('users')
class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Post('create')
    async create(
        @Body() user: {
            email: string;
            surname: string;
            first_name: string;
            second_name?: string;
            password: string
        }
    ) {
        return this.usersService.create(user);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.usersService.delete(id);
        return { message: 'User deleted successfully' };
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body()
        user: {
            email: string;
            surname: string;
            first_name: string;
            second_name?: string;
            password: string;
        }
    ) {
        return this.usersService.update({ ...user, id_user: id });
    }
}

@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
//EOF