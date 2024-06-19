import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class KitchenService implements OnModuleInit {
  async onModuleInit() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('order.process', { durable: false });
    await channel.consume('order.process', async (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        order.status = 'Processed';
        // Update order status in database or perform other actions
        channel.ack(msg);
      }
    });
  }
}
