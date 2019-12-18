import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/models/message.entity';
// Services
import { AppService } from './app.service';
import { MessageService } from './messages/services/message.service';
const PROVIDERS = [ AppService, MessageService ];
// Controllers
import { AppController } from './app.controller';
import { MessageController } from './messages/message.controller';
const CONTROLLERS = [ AppController, MessageController ];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [...CONTROLLERS],
  providers: [...PROVIDERS],
})
export class AppModule {}
