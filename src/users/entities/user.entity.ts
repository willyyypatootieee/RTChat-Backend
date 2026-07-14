import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })

@ObjectType()
export class User extends AbstractEntity {
    @Prop()
    @Field()
    email!: string;

    @Prop()
    password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);