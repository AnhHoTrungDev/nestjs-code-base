import { PORT, PRIMARY_COLOR } from './environments/index';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    Logger.log(`🌨️  connect database...`, 'TypeORM', false)
    const connection = getConnection('default');

    const { isConnected } = connection;
    isConnected
      ? Logger.log(`🌨️  Database connected`, 'TypeORM', false)
      : Logger.error(`❌  Database connect error`, '', 'TypeORM', false);

    // NOTE: tasks
    // timeout()
    // interval()

    await app.listen(PORT);

    Logger.log(`🚀  Server is listening on port ${PORT}`, 'Bootstrap', false);
  } catch (error) {
    // logger.error(error)
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
  }
}
bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
