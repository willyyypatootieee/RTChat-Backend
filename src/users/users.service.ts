import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {

  }
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.UsersRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
