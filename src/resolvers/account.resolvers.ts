import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AccountEntity, UserEntity } from './../models';
import {
  AccountInput,
  ChangePasswordInput,
  AccountResponse,
  LoginInput,
  // LoginResponse,
} from './../generator/graphql.schema';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { getMongoRepository } from 'typeorm';

@Resolver()
export class AccountResolver {
  @UseGuards(AuthGuard('local'))
  @Mutation()
  async login(@Args(`payload`) payload: LoginInput) {
    console.log('payload :>> ', payload);
    return true
  }

  @Query()
  async accounts(@Args(`payload`) payload): Promise<AccountResponse[]> {
    const privateUser: string[] = [`anh.ho1`, `anh.ho`];

    if (payload) {
      const conditions: any = {};

      if (!payload._id) {
        for (const property in payload) {
          if (property) {
            conditions[property] = {
              $regex: payload[property],
              $options: 'sui',
            };
          }
        }
      }

      if (payload._id) {
        conditions['_id'] = payload._id;
      }

      if (payload.userName) {
        if (privateUser.includes(payload.userName)) {
          return [];
        }
      }

      return getMongoRepository(AccountEntity).find({
        where: conditions,
      });
    }
    // userName: { $nin: [`anh.ho1`, `anh.ho`]

    return getMongoRepository(AccountEntity).find({
      where: { userName: { $nin: privateUser } },
    });
  }

  @Query()
  async account(@Args(`_id`) _id): Promise<AccountResponse> {
    return getMongoRepository(AccountEntity).findOne({
      where: _id,
    });
  }

  @Mutation()
  async register(@Args(`input`) account: AccountInput): Promise<AccountEntity> {
    const { userProfile, ...refAccount } = account;
    const findAccount = await getMongoRepository(AccountEntity).findOne({
      where: { userName: refAccount.userName },
    });

    if (findAccount) {
      throw new ConflictException(`'user name' already exists`);
    }

    if (
      !userProfile ||
      userProfile.firstName === '' ||
      userProfile.lastName === ''
    ) {
      throw new BadRequestException('User need last name and first name');
    }

    try {
      const user = await getMongoRepository(UserEntity).save(
        new UserEntity(userProfile),
      );

      return getMongoRepository(AccountEntity).save(
        new AccountEntity({ ...refAccount, userId: user._id }),
      );
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @Mutation()
  async changePassword(
    @Args(`payload`) payload: ChangePasswordInput,
  ): Promise<Boolean> {
    const { _id, password } = payload;

    const changePassword = await getMongoRepository(AccountEntity).updateOne(
      { _id },
      { $set: { password, updatedAt: +new Date() } },
    );

    const result = changePassword.result;

    if (!result) {
      throw new HttpException(`something went wrong`, 500);
    }

    if (result.n === 0) {
      throw new NotFoundException(`Can't find account`);
    }

    return result.nModified === 1;
  }
}
