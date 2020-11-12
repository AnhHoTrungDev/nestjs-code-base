import { TypeOrmService } from './config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';

import * as Resolvers from './resolvers';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      // debug: false,
      // playground: false,
      typePaths: ['./**/*.graphql'],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...Object.values(Resolvers)],
})


export class AppModule {}
