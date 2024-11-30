export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  dob: string;
  country: string;
  residential_address: string;
  allow_notifications: boolean;
  notification_types: string | null;
  preferred_otp_medium: string;
  created_at: string;
  updated_at: string;
  next_of_kin: NextOfKin;
  initials?: string;
};

type NextOfKin = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  relationship: string;
  residential_address: string;
};
