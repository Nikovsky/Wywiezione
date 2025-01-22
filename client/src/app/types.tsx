// User interface
export interface User {
  id_user: number;
  email: string;
  surname: string;
  first_name: string;
  second_name?: string | null;
  created_at: string;
  updated_at: string;
  status: string;
  role: string;
  password: string;
}
//EOF