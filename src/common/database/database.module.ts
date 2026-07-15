import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose'
import {DbMigrationService} from "./db-migration.service";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get("MONGODB_URI"),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [DbMigrationService],
})
export class DatabaseModule {}