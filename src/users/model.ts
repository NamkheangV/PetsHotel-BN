interface Users {
    user_id: string;
    user_pass: string;
    user_email: string;
    user_fname?: string | null;
    user_lname?: string | null;
    user_phone?: string | null;
    user_image?: Buffer | null;
    user_type: number;
}

export default Users;