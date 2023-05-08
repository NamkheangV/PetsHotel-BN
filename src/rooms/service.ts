import { Prisma, PrismaClient, rooms as RoomsModel } from "@prisma/client";

class RoomsService {
  private static prisma: PrismaClient = new PrismaClient();

  // Get all rooms
  public static async getAllRooms() {
    return this.prisma.rooms.findMany();
  }

  // Get room by id
  public static async getRoomById(
    where: Prisma.roomsWhereUniqueInput
  ): Promise<RoomsModel | null> {
    return this.prisma.rooms.findUnique({ where });
  }
}

export default RoomsService;
