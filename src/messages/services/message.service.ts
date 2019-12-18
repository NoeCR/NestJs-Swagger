import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../models/message.entity';
import { Repository } from 'typeorm';
import { MessageDto } from '../interfaces/create-message-dto';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    ) {}

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async getOne( id: number ): Promise<Message> {
        return await this.messageRepository.findOne( id );
    }

    async createMessage( msg: MessageDto ): Promise<Message> {
        return await this.messageRepository.save( msg );
    }

    async updatemessage(id: number,  msg: MessageDto ): Promise<any> {
        return { result : !!await this.messageRepository.update( id, { ...msg } ) };
    }

    async deleveMessage( id: number ): Promise<any> {
        return this.messageRepository.delete( id );
    }
}
