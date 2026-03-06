import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const email = dto.email.trim().toLowerCase();
    const name = dto.name.trim();
    const passwordHash = await bcrypt.hash(dto.password, 10);

    try {
      return await this.prisma.user.create({
        data: { email, name, passwordHash },
        select: { id: true, email: true, name: true, createdAt: true },
      });
    } catch (e: any) {
      if (e?.code === "P2002") throw new ConflictException("Email уже занят");
      throw e;
    }
  }

  async deleteById(id: number) {
    const res = await this.prisma.user.deleteMany({ where: { id } });
    if (res.count === 0) throw new NotFoundException("User not found");
    return { ok: true };
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  }
}