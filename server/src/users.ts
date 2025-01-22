import { Controller, Get, Post, Delete, Put, Body, Param, Module, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import DB_POOL from './db';
import * as argon2 from 'argon2';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id_user: number;

    @Column({ type: 'varchar', length: 1024, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    surname: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    second_name?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({
        type: 'enum',
        enum: ['active', 'inactive', 'banned', ''],
        default: 'active',
    })
    status: 'active' | 'inactive' | 'banned' | '';

    @Column({
        type: 'enum',
        enum: ['root', 'administrator', 'worker', 'user'],
        default: 'user',
    })
    role: 'root' | 'administrator' | 'worker' | 'user';

    @Column({ type: 'varchar', length: 4096, nullable: false })
    password: string;
}

@Injectable()
class UsersService {
    constructor(
        @Inject('DB_POOL') private readonly pool: any
    ) { }


    async findAll(): Promise<any> {
        const [rows] = await this.pool.query('SELECT * FROM users');
        return rows;
    }

    async create(user: {
        email: string;
        surname: string;
        first_name: string;
        second_name?: string;
        password: string;
    }): Promise<any> {
        const { email, surname, first_name, second_name, password } = user;
        console.log('Creating user:', user);
        const [result] = await this.pool.execute(
            'INSERT INTO users (email, surname, first_name, second_name, password) VALUES (?, ?, ?, ?, ?)',
            [email, surname, first_name, second_name, password],
        );
        return { id: (result as any).insertId, ...user };
    }

    async delete(id: number): Promise<void> {
        const [result] = await this.pool.execute('DELETE FROM users WHERE id_user = ?', [id]);
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
        const [result] = await this.pool.execute(
            'UPDATE users SET email = ?, surname = ?, first_name = ?, second_name = ?, password = ? WHERE id_user = ?',
            [email, surname, first_name, second_name, password, id_user]
        );
        if ((result as any).affectedRows === 0) {
            throw new Error(`User with ID ${id_user} not found`);
        }
        const [updatedUser] = await this.pool.execute('SELECT * FROM users WHERE id_user = ?', [id_user]);
        return updatedUser[0];
    }

    async findByEmail(email: string): Promise<any> {
        const [result] = await this.pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        return result[0];
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

    @Post('register')
    async register(
        @Body()
        user: {
            email: string;
            surname: string;
            first_name: string;
            second_name?: string;
            password: string;
        },
    ) {
        try {
            const hashedPassword = await argon2.hash(user.password);
            return this.usersService.create({ ...user, password: hashedPassword });
        } catch (error) {
            throw new Error('User registration failed.');
        }
    }

    @Post('login')
    async login(
        @Body()
        credentials: {
            email: string;
            password: string;
        },
    ) {
        const { email, password } = credentials;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        //TODO: Success: Return user data (may also return a JWT token here)
        return { message: 'Login successful', user: { id_user: user.id_user, email: user.email, role: user.role } };
    }

}

@Module({
    controllers: [UsersController],
    providers: [UsersService, { provide: "DB_POOL", useValue: DB_POOL }],
})
export class UsersModule { }
//EOF