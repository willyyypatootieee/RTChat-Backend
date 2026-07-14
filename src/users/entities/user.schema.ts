import { AbstractEntity } from '../../common/database/abstract.entity';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class UserDocument extends AbstractEntity {
    @Prop()
    email!: string;

    @Prop()
    password!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);