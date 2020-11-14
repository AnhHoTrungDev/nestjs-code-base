import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './../../generator/graphql.schema';
import { Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ResGql = createParamDecorator(
  (data, context: ExecutionContext): Response =>
    GqlExecutionContext.create(context).getContext().res,
);

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req && ctx.req.user,
);
