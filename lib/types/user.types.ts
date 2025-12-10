export interface ProfilePType {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  bio: string;
  phone_number: string;
  timezone: string;
  email_notifications: boolean;
}

export interface UserType {
  id: string;
  email: string;
  fullname?: string;
  username: string;
  avatar?: string;
}
