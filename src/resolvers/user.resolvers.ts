import { UserUpdateInput } from './../generator/graphql.schema';
import { UserEntity } from './../models';
import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { getMongoRepository } from 'typeorm';
import { UserInput, UserSearchInput } from 'src/generator/graphql.schema';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

@Resolver()
export class UserResolver {
  @Query()
  async users(
    @Args('accessToken') accessToken: string,
    @Context() context: any,
  ): Promise<UserEntity[]> {
    const { req, res } = context;

    req.body = {
      ...req.body,
      access_token: accessToken,
    };

    return getMongoRepository(UserEntity).find();
  }

  @Query()
  async searchUser(
    @Args('payload') input: UserSearchInput,
  ): Promise<UserEntity[]> {
    const conditions: any = {};

    if (!input._id) {
      for (const property in input) {
        if (property) {
          conditions[property] = { $regex: input[property], $options: 'sui' };
        }
      }
    }

    if (input._id) {
      conditions['_id'] = input._id;
    }

    return getMongoRepository(UserEntity).find({
      where: conditions,
    });
  }

  @Query()
  async user(@Args('_id') _id: string): Promise<UserEntity> {
    return getMongoRepository(UserEntity).findOne({
      where: _id,
    });
  }

  @Mutation()
  async addNewUser(@Args('input') user: UserInput): Promise<UserEntity> {
    if (!user || user.firstName === '' || user.lastName === '') {
      throw new BadRequestException('User need last name and first name');
    }
    return getMongoRepository(UserEntity).save(new UserEntity(user));
  }

  @Mutation()
  async updateUser(
    @Args('_id') idUser: string,
    @Args('payload') user: UserUpdateInput,
  ): Promise<Boolean> {
    const updated = await getMongoRepository(UserEntity).updateOne(
      {
        _id: idUser,
      },
      {
        $set: { ...user, updatedAt: +new Date() },
      },
    );

    const result = updated.result;

    if (!result) {
      throw new HttpException(`something went wrong`, 500);
    }

    if (result.n === 0) {
      throw new NotFoundException(`Can't find user`);
    }

    return result.nModified === 1;
  }
}
