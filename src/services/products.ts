import axios from "axios";

export class ProductApi {
  static async getProducts() {
    const response = await axios.get(
      "http://reacttrainingbackend.azurewebsites.net/product"
    );
    return response.data;
  }
}
