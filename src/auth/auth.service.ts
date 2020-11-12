import { AccountEntity, UserEntity } from './../models';
import { Injectable } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Run  AuthService:>> ' );
    const account = await getMongoRepository(AccountEntity).findOne(username);

    if (account && account.password === pass) {
      return getMongoRepository(UserEntity).findOne(account.userId);
    }
    
    return null;
  }
}
