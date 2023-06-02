import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, type Server } from 'socket.io';

interface Message {
  origin_type: 'me' | 'user' | 'system';
  origin_header?: string;
  content: string;
}

interface UserName {
  user?: string;
  name: string;
}

const user_name: UserName[] = [
  { name: 'John' },
  { name: 'Jane' },
  { name: 'Doe' },
  { name: 'Smith' },
  { name: 'Alex' },
  { name: 'Bob' },
  { name: 'Alice' },
  { name: 'Eve' },
  { name: 'Carol' },
  { name: 'Mallory' },
  { name: 'Trent' },
  { name: 'Victor' },
  { name: 'Walter' },
  { name: 'Wendy' },
  { name: 'Winston' },
  { name: 'Zoe' },
  { name: 'Zelda' },
  { name: 'Yvonne' },
  { name: 'Xavier' },
  { name: 'Ursula' },
  { name: 'Tina' },
  { name: 'Sue' },
  { name: 'Rudy' },
  { name: 'Quinn' },
  { name: 'Pete' },
  { name: 'Oscar' },
  { name: 'Nancy' },
  { name: 'Molly' },
  { name: 'Liam' },
  { name: 'Kevin' },
  { name: 'Irene' },
  { name: 'Hank' },
  { name: 'Gina' },
  { name: 'Frank' },
  { name: 'Eva' },
  { name: 'Dawn' },
  { name: 'Cathy' },
  { name: 'Brenda' },
  { name: 'Amy' },
  { name: 'Adam' },
  { name: 'Zack' },
  { name: 'Yolanda' },
  { name: 'Xander' },
  { name: 'Wade' },
  { name: 'Violet' },
  { name: 'Uma' },
  { name: 'Trevor' },
  { name: 'Sally' },
  { name: 'Ralph' },
  { name: 'Quincy' },
];

@WebSocketGateway({ cors: true })
export class ChatGatewey {
  @WebSocketServer() server: Server;

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() { room }: { room: string },
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.join(room);
    user_name.some((user) => {
      if (!user.user) {
        user.user = socket.id;
        return true;
      }
      return false;
    });
    const name = user_name.find((user) => user.user === socket.id)?.name;
    socket.emit('joined', room);
    socket.emit('message', {
      origin_type: 'system',
      content: `Seu nome é ${name}`,
    });

    const room_id = room.split('/')[1];
    if (room_id === 'guest') {
      socket.emit('message', {
        origin_type: 'system',
        content:
          'Você pode digitar "/1" "/2" ou "/3" para se sincronizar com as tarefas 1 2 ou 3',
      });
    }
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() { room, message }: { room: string; message: string },
    @ConnectedSocket() socket: Socket,
  ): void {
    const name = user_name.find((user) => user.user === socket.id)?.name;
    const [id, user_id] = room.split('/');
    if (message.startsWith('/')) {
      const task = message.split('/')[1];
      const new_room = `${id}/${task}`;

      socket.leave(room);

      socket.join(new_room);
      socket.emit('room_change', new_room);
      socket.emit('message', {
        origin_type: 'system',
        content: `Você está sincronizado com a tarefa ${new_room}`,
      });
      socket.broadcast.to(new_room).emit('message', {
        origin_type: 'system',

        content: `O usuário ${name} está sincronizado com a tarefa ${new_room}`,
      });
      return;
    }
    const msg: Message = {
      origin_type: 'user',
      content: message,
      origin_header: name,
    };
    socket.broadcast.to(room).emit('message', msg);
  }
}
