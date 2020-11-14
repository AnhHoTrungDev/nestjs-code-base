import { ConflictException, HttpException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Response } from 'express';
import { ResGql } from './../share/decorator/decorators';
import { UserEntity } from './../models/user.entity';
import { AccountEntity } from './../models/account.entity';
import {
  AccountInput,
  LoginInput,
  AuthPayload,
} from './../generator/graphql.schema';
import { JwtService } from '@nestjs/jwt';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly jwt: JwtService) {}

  @Mutation()
  async login(
    @Args('payload') payload: LoginInput,
    @ResGql() res: Response,
  ): Promise<AuthPayload> {
    const { userName, password } = payload;
    const account = await getMongoRepository(AccountEntity).findOne({
      userName,
    });

    if (!account) {
      throw Error('User incorrect');
    }

    if (account.password === password) {
      const user = await getMongoRepository(UserEntity).findOne({
        _id: account.userId,
      });

      const jwt = this.jwt.sign({ id: user._id });
      //   const jwtRefresh = this.jwt.sign({ id: user._id }, { expiresIn: 3600 });
      //   res.cookie('refresh-token', jwtRefresh, { httpOnly: true });

      return {
        access_token: jwt,
        userProfile: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } else {
      throw Error('Password incorrect');
    }
  }

  @Mutation()
  async register(
    @Args('input') account: AccountInput,
    @ResGql() res: Response,
  ): Promise<AuthPayload> {
    const { userProfile, ...refAccount } = account;
    const findAccount = await getMongoRepository(AccountEntity).findOne({
      userName: refAccount.userName,
    });

    if (findAccount) {
      throw new ConflictException(`'user name' already exists`);
    }

    try {
      const user = await getMongoRepository(UserEntity).save(
        new UserEntity(userProfile),
      );

      const account = await getMongoRepository(AccountEntity).save(
        new AccountEntity({ ...refAccount, userId: user._id }),
      );

      const jwt = this.jwt.sign({ id: account.userId });
      //   const jwtRefresh = this.jwt.sign({ id: user._id }, { expiresIn: 3600 });
      //   res.cookie('refresh-token', jwtRefresh, { httpOnly: true });

      return {
        access_token: jwt,
        userProfile: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
