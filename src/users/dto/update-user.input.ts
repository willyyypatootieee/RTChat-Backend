import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  email!: string;

  @Field({ nullable: true })
  password?: string;
}
