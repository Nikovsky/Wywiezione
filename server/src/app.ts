import { Controller, Get, Post, Delete, Body, Param, Module, Injectable } from '@nestjs/common';
import { UsersModule } from './users';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}

@Module({
    imports: [UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
//EOF