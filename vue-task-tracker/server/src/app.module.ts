import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.backend'
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      bufferCommands: false,
      connectionFactory: (connection) => {
        connection.on('connected', () =>
          console.log('MongoDB connection established'));
        connection.on('error', (err) =>
          console.error('MongoDB connection error:', err));
        return connection;
      }
    }),
    TasksModule,
  ],
})
export class AppModule {}