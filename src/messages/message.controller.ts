import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { MessageDto } from './interfaces/create-message-dto';
import { MessageService } from './services/message.service';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly msgService: MessageService) {}

    @Post()
        @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
        @ApiResponse({ status: 403, description: 'Forbidden.'})
        create( @Body() createMessageDto: MessageDto, @Res() response ) {
            this.msgService.createMessage( createMessageDto )
                .then( res => {
                    response.status(HttpStatus.CREATED).json(res);
                })
                .catch( ex => {
                    response.status(HttpStatus.FORBIDDEN).json({ex,  message: 'forbidden' });
                });
        }

    @Get()
        @ApiResponse({ status: 200, description: 'All messages', type: MessageDto})
        @ApiResponse({ status: 404, description: 'Not found.'})
        getAll( @Res() response ) {
            this.msgService.getAll()
                .then( msgList => {
                    response.status(HttpStatus.OK).json({ total: msgList.length, data: msgList });
                })
                .catch( ex => {
                    response.status(HttpStatus.NOT_FOUND).json({ex,  message: 'messages not found' });
                });
        }

    @Get(':id')
        @ApiParam({ name: 'id', required: true })
        @ApiResponse({ status: 200, description: 'One messages', type: MessageDto})
        @ApiResponse({ status: 404, description: 'Not found.'})
        getOne( @Res() response,  @Param('id') msgId ) {
            this.msgService.getOne( msgId )
                .then( msgList => {
                    response.status(HttpStatus.OK).json({ total: 1, data: msgList });
                })
                .catch( ex => {
                    response.status(HttpStatus.NOT_FOUND).json({ex,  message: 'message not found' });
                });
        }
    @Put(':id')
        @ApiParam({ name: 'id', required: true })
        @ApiResponse({ status: 202, description: 'All messages', type: MessageDto})
        @ApiResponse({ status: 404, description: 'Not found.'})
        updateMessage( @Body() updateMessageDto: MessageDto, @Res() response, @Param('id') msgId ) {
            this.msgService.updatemessage( msgId, updateMessageDto )
                .then( res => { response.status(HttpStatus.ACCEPTED).json(res); })
                .catch( ex => { response.status(HttpStatus.NOT_FOUND).json({ex,  message: 'message not found' }); });
        }

    @Delete(':id')
        @ApiParam({ name: 'id', required: true })
        @ApiResponse({ status: 200, description: 'Deleted succesfully'})
        @ApiResponse({ status: 404, description: 'Not found.'})
        deleteMessage( @Res() response, @Param('id') msgId ) {
            this.msgService.deleveMessage( msgId )
                .then( res => { response.status(HttpStatus.OK).json(res); })
                .catch( ex => { response.status(HttpStatus.NOT_FOUND).json({ex,  message: 'message not found' }); });
        }
}
