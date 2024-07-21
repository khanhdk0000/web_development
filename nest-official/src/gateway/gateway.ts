import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('new connection');
      console.log(socket.id);
    });
  }

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      data: 'Hello from server',
      body: body,
    });
  }
}
