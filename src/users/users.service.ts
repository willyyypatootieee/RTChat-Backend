import { UsersRepository } from './users.repository';
import {Injectable, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.UsersRepository.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password),
    });
  }

  private hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  async findAll() {
    return this.UsersRepository.find({})
  }

  async findOne(_id: string) {
    return this.UsersRepository.findOne({ _id });
  }

  async update(updateUserInput: UpdateUserInput) {
    const { email, password } = updateUserInput;
    const updateData: { password?: string } = {};

    if (password) {
      updateData.password = await this.hashPassword(password);
    }

    const updatedUser = await this.UsersRepository.findOneAndUpdate(
        { email },
        {
          $set: updateData,
        },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return updatedUser;
  }

  async remove(_id: string) {
    return this.UsersRepository.findOneAndDelete({ _id });
  }
}
