import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";

import { UsersModule } from './users/users.module';
import { getEnvPath } from './common/helper/env.helper';
import { User } from "./users/users.model";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot(
          {
            envFilePath, isGlobal: true
        }
        ),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User],
            autoLoadModels: true,
          }),
        UsersModule,
    ]
})
// https://www.youtube.com/watch?v=dDeWWQWMM-Y&t=56s 17:47 nest js не видит .env
export class AppModule {}