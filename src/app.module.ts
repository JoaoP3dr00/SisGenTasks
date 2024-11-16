import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [],
  providers: [],  // É a forma de injetar dependência do nest, todas as classes com @injectable vêem aqui
})
export class AppModule {}
