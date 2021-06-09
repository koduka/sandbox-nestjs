import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(name: string, email: string, role: string, password: string) {
    const user: User = new User();
    user.name = name;
    user.email = email;
    user.role = role;
    user.password = password;
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

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
