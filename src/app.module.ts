import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { DatabaseModule } from './database.module';
import { TaskModule } from './task.module';
import { TaskPrincipalModule } from './task.principal.module';

@Module({
  imports: [TaskModule, UserModule, TaskPrincipalModule, DatabaseModule],
  controllers: [],
  providers: [],  // É a forma de injetar dependência do nest, todas as classes com @injectable vêem aqui
})
export class AppModule {}