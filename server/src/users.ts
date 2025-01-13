import { Controller, Get, Post, Delete, Body, Param, Module, Injectable } from '@nestjs/common';
import pool from './db'; // Import the shared database pool

@Injectable()
class UsersService {
    async findAll(): Promise<any> {
        const [rows] = await pool.query('SELECT * FROM users');
        // console.log(rows);
        return rows;
    }

    async create(user: { email: string; surname: string; first_name: string; second_name?: string; password: string }): Promise<any> {
        const { email, surname, first_name, second_name, password } = user;
        const [result] = await pool.execute(
            'INSERT INTO users (email, surname, first_name, second_name, password) VALUES (?, ?, ?, ?, ?)',
            [email, surname, first_name, second_name, password],
        );
        return { id: (result as any).insertId, ...user };
    }

    async delete(id: number): Promise<void> {
        const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        if ((result as any).affectedRows === 0) {
            throw new Error(`User with ID ${id} not found`);
        }
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
    async create(@Body() user: { email: string; surname: string; first_name: string; second_name?: string; password: string }) {
        return this.usersService.create(user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.usersService.delete(Number(id));
        return { message: 'User deleted successfully' };
    }
}

@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
//EOF