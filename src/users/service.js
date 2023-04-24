import { PrismaClient } from "@prisma/client";

export default class UserService {
  static prisma = new PrismaClient();

  static async findMany() {
    return await this.prisma.users.findMany();
  }

  static async findOne(id) {
    return await this.prisma.users.findUnique({
      where: {
        user_id: id,
      },
    });
  }

  static async userCreate(data) {
    return await this.prisma.users.create({
      data,
    });
  }

  static async userUpdate(id, data) {
    return await this.prisma.users.update({
      where: {
        user_id: id,
      },
      data,
    });
  }

  static async userDelete(id) {
    return await this.prisma.users.delete({
      where: {
        user_id: id,
      },
    });
  }
}
