import { Prisma, PrismaClient, booking as BookingModel } from "@prisma/client";

class BookingService {
  private static prisma: PrismaClient = new PrismaClient();

  // Get all bookings
  public static async getAllBookings() {
    return this.prisma.booking.findMany({
      select: {
        payment_proof: false,
        bk_id: true,
        bk_cus_fname: true,
        bk_cus_lname: true,
        bk_cus_phone: true,
        bk_pet_amount: true,
        bk_pet_name: true,
        bk_pet_breed: true,
        checkin_date: true,
        checkout_date: true,
        bk_status: true,
        room_id: true,
        user_id: true,
      },
    });
  }

  // Get booking by id
  public static async getBookingById(
    where: Prisma.bookingWhereUniqueInput
  ): Promise<BookingModel | null> {
    return this.prisma.booking.findUnique({ where });
  }

  // Create booking
  public static async createBooking(
    data: Prisma.bookingCreateInput
  ): Promise<BookingModel> {
    return this.prisma.booking.create({ data });
  }

  // Update booking
  public static async updateBooking(
    where: Prisma.bookingWhereUniqueInput,
    data: Prisma.bookingUpdateInput
  ): Promise<BookingModel> {
    return this.prisma.booking.update({ where, data });
  }

  // Delete booking
  public static async deleteBooking(
    where: Prisma.bookingWhereUniqueInput
  ): Promise<BookingModel> {
    return this.prisma.booking.delete({ where });
  }
}

export default BookingService;
