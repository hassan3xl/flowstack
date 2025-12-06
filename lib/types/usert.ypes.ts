export interface Profile {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  bio: string;
  phone_number: string;
  timezone: string;
  email_notifications: boolean;
}

export interface User {
  id: string;
  email: string;
  fullname?: string;
  username: string;
  // profile?: Profile;
  // avatar?: string;
}
