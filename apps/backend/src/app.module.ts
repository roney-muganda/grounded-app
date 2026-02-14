import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Condition } from './entities/condition.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature([User, Profile, Condition]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
