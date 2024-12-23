export interface UserInterface {
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  companyName: String;
  address: {
    country: String;
    city: String;
    streetAddress: String;
    zipCode: String;
  };
  role: String;
  wishlist: Array<string>;
}
