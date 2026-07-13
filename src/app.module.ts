import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './common/database/database.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required()
            })
        }),
        DatabaseModule,
    ],
    // controllers: [AppController],
    // providers: [AppProviders],
})
export class AppModule {}
