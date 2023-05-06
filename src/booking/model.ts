interface Booking {
  bk_id: number;
  bk_cus_fname: string;
  bk_cus_lname: string;
  bk_cus_phone: string;
  bk_pet_amount: number;
  bk_pet_name: string;
  bk_pet_breed: string;
  checkin_date: Date;
  checkout_date: Date;
  bk_status: number;
  room_id: string;
  user_id: string;
}

export default Booking;