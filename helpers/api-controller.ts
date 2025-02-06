import axios from "axios";
import { ProductProps } from "./types";
import { signOut } from "firebase/auth";

//payments
export async function makePayment(data: any) {
  try {
    const transaction = await axios.post("/api/payments/make-payment", data);
    return transaction.data;
  } catch (error) {
    return error;
  }
}

export const getExchangeRates = async () => {
  try {
    const rates = await axios.get(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/ngn.json"
    );
    return rates.data;
  } catch (error) {
    return error;
  }
};

export async function verifyTransaction(txref: string) {
  try {
    const transaction = await axios.get(`/api/verify-payment?txref=${txref}`);
    return transaction.data;
  } catch (error) {
    return error;
  }
}

//orders
export async function createOrder(order: any) {
  try {
    return await axios.post(`/api/orders/create-order`, order);
  } catch (error) {
    return error;
  }
}

export async function getAllOrders() {
  try {
    const orders = await axios.get(`/api/orders/get-all-orders`);
    return orders.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function updateOrder(data: any) {
  try {
    return await axios.put(`/api/orders/update-order`, data);
  } catch (error) {
    return error;
  }
}

//products
export async function updateProduct(data: any) {
  try {
    return await axios.put(`/api/products/update-product`, data);
  } catch (error) {
    return error;
  }
}

export async function addNewProduct(product: ProductProps) {
  try {
    return await axios.post(`/api/products/add-new-product`, product);
  } catch (error) {
    return error;
  }
}

export async function getAllProducts() {
  try {
    const products = await axios.get(`/api/products/get-all-products`);
    return products.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getAllActiveProducts() {
  try {
    const products = await axios.get(`/api/products/get-all-active-products`);
    return products.data;
  } catch (err) {
    return err;
  }
}

export async function getProduct(id: string) {
  try {
    const product = await axios.get(`/api/products/get-product?id=${id}`);
    return product.data;
  } catch (err) {
    return err;
  }
}
export async function deleteProduct(id: any) {
  try {
    return await axios.delete(`/api/products/delete-product?id=${id}`);
  } catch (error) {
    return error;
  }
}

//admins
