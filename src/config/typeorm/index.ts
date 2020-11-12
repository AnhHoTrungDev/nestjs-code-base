import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import config from '../../config.orm';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'mongodb',
//     host: "localhost",
//     port: 2717,
//     synchronize: true,
//     useUnifiedTopology: true,
//     database :"my-code-base",
//     logging: true
// }

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    Logger.log(`${config.url}`, 'URL Config Orm ', false);
    const options = {
      ...config,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: true,
      autoLoadEntities: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      logging: true,
    };

    return options as TypeOrmModuleOptions;
  }
}
