import { Prisma, PrismaClient, users as UsersModel } from "@prisma/client";

class UsersService {
    private static prisma: PrismaClient = new PrismaClient();

    // Get all users
    public static async getAllUsers() {
        return this.prisma.users.findMany();
    }

    // Get user by id
    public static async getUserById(where: Prisma.usersWhereUniqueInput): Promise<UsersModel | null> {
        return this.prisma.users.findUnique({ where });
    }

    // Create user
    public static async createUser(data: Prisma.usersCreateInput): Promise<UsersModel> {
        return this.prisma.users.create({ data });
    }

    // Update user
    public static async updateUser(where: Prisma.usersWhereUniqueInput, data: Prisma.usersUpdateInput): Promise<UsersModel> {
        return this.prisma.users.update({ where, data });
    }

    // Delete user
    public static async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<UsersModel> {
        return this.prisma.users.delete({ where });
    }

}

export default UsersService;