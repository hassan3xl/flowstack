export interface ProfileUserType {
  id: string;
  email: string;
}

export interface ProfilePType {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  bio: string;
  phone_number: string;
  user: ProfileUserType;
}

export interface UserType {
  id: string;
  email: string;
  fullname?: string;
  username: string;
  avatar?: string;
}

export interface AuthUserType {
  id: string;
  user: ProfileUserType;
  full_name?: string;
  username: string;
  avatar?: string;
}
