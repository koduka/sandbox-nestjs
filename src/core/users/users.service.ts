import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.role = createUserDto.role;
    user.password = createUserDto.password;
    const repositry: Repository<User> = getRepository(User);

    return await repositry.save(user);
  }

  findAll() {
    const repositry: Repository<User> = getRepository(User);

    return repositry.find();
  }

  findById(id: string) {
    const repositry: Repository<User> = getRepository(User);
    return repositry.findOne(id);
  }

  findByEmail(email: string) {
    const repositry: Repository<User> = getRepository(User);
    return repositry.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
