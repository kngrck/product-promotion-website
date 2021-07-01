import { storage } from "./firebase-cloud";
import { Product } from "../models/Product";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3000/api/products");
  const resData = await response.json();

  if (!resData) {
    throw new Error("Something went wrong!.");
  }

  let productsList: Product[] = [];

  resData.map((p: Product) => {
    const newProduct: Product = {
      id: p.id,
      name: p.name,
      description: p.description,
      imageName: p.imageName,
      imageUrl: p.imageUrl,
      count: p.count,
      price: p.price,
    };

    productsList.push(newProduct);
  });

  productsList = await JSON.parse(JSON.stringify(productsList));
  return productsList;
}

export async function addProduct(product: Product, image: File) {
  const imageName = product.name + Date.now();
  try {
    const products = await getAllProducts();

    const existProduct = products.find((i) => i.name === product.name);

    if (existProduct) {
      throw new Error("Ürün zaten var.");
    }

    if (!image) {
      throw new Error("Lutfen resim secin");
    }

    const uploadTask = await storage.ref(`/product/${imageName}`).put(image);
    const downloadURL = await uploadTask.ref.getDownloadURL();
    product.imageName = imageName;
    product.imageUrl = downloadURL;
    const response = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  updatedProduct: Product,
  image: File | null
) {
  try {
    const products = await getAllProducts();

    const existProduct = products.find((i) => i.id === updatedProduct.id);

    if (!existProduct) {
      throw new Error("Ürün bulunamadi.");
    }
    updatedProduct.imageName = existProduct.imageName;
    if (image) {
      const uploadTask = await storage
        .ref(`/product/${updatedProduct.imageName}`)
        .put(image);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      updatedProduct.imageUrl = downloadURL;
    }

    const response = await fetch(
      `http://localhost:3000/api/products/${updatedProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(deleteProduct: Product) {
  try {
    await storage.ref(`/product/${deleteProduct.imageName}`).delete();
    const response = await fetch(
      `http://localhost:3000/api/products/${deleteProduct.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
}
