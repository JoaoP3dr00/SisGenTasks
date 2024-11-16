import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],  // É a forma de injetar dependência do nest, todas as classes com @injectable vêem aqui
})
export class AppModule {}
