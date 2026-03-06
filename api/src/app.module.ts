import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma/prisma.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
