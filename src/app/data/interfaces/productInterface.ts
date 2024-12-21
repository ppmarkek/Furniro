export interface ProductInterface {
  _id: String;
  title?: String;
  label?: String;
  imgs?: Array<string>;
  size: Array<string>;
  color: Array<string>;
  quantity: Number;
  discound?: Number;
  price?: Number;
  sku: String;
  categoty: String;
  tags: Array<string>;
  description: String;
  additionalInformation: String;
  review?: {
    user: String;
    userName: String;
    stars: Number;
    description: String;
  };
}
