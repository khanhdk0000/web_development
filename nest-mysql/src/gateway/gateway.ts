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

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    console.log(data);
    this.server.emit('events', {
      data: 'Hello from server',
      body: data,
    });
  }
}
