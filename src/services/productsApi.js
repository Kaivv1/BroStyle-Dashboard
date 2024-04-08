import { PAGE_SIZE } from "../utils/constants";
import { getImageName } from "../utils/helpers";
import { getCurrentUser } from "./authApi";
import { supabase, supabaseUrl } from "./supabase";

function createProductImage(product) {
  const imageName =
    `${Math.random()}-${product.picture.name}-${product.category === "t-shirts" ? "shirt" : "hoodie"}`.replaceAll(
      "/",
      "",
    );

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

  return { imageName, imageUrl };
}

export async function getProducts(page) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(from, to);

  return { products, error, count };
}

export async function getAllProducts() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);

  return products;
}

export async function getProductsByIds(ids) {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids);

  return { products, error };
}

export async function createProduct(newProduct) {
  const { imageName, imageUrl } = createProductImage(newProduct);

  const { data, error } = await supabase
    .from("products")
    .insert([{ ...newProduct, picture: imageUrl, access: "normal" }])
    .select()
    .single();

  const { error: storageError } = await supabase.storage
    .from("images")
    .upload(imageName, newProduct.picture);

  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
  }
  if (error || storageError)
    throw new Error("There was a problem creating the product");

  return data;
}

export async function editProduct(product, id) {
  const user = await getCurrentUser();

  if (product.access === "admin" && user.access !== "admin") {
    throw new Error(
      "You dont have permissions for this product! If you are on demo create a new product",
    );
  }

  let imageUrl;

  const { data: existingProduct, error: existingProductError } = await supabase
    .from("products")
    .select("picture")
    .eq("id", id)
    .single();

  if (existingProduct.picture === product.picture) {
    imageUrl = existingProduct.picture;
  } else {
    const oldImageName = getImageName(existingProduct.picture);
    const { error: deleteImageError } = await supabase.storage
      .from("images")
      .remove([oldImageName]);

    const { imageName: newImageName, imageUrl: newImageUrl } =
      createProductImage(product);

    imageUrl = newImageUrl;

    const { error: uploadImageError } = await supabase.storage
      .from("images")
      .upload(newImageName, product.picture);

    if (deleteImageError || uploadImageError)
      throw new Error("There was a problem editing this product");
  }

  const { data: editedProduct, error: editProductError } = await supabase
    .from("products")
    .update({ ...product, picture: imageUrl })
    .eq("id", id)
    .select()
    .single();

  if (existingProductError || editProductError)
    throw new Error("There was a problem editing this product");

  return editedProduct;
}

export async function deleteProduct(id) {
  const { data: product, error: errorProduct } = await supabase
    .from("products")
    .select("picture, access")
    .eq("id", id)
    .single();

  const user = await getCurrentUser();

  if (product.access === "admin" && user.access !== "admin") {
    throw new Error(
      "You dont have permissions to delete this product! If you are on demo create and then delete a product.",
    );
  }

  const { error: errorDeleteProduct } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  const imageName = getImageName(product.picture);

  const { error: errorImage } = await supabase.storage
    .from("images")
    .remove([imageName]);

  if (errorProduct || errorDeleteProduct || errorImage)
    throw new Error("There was a probelm deleting this product");
}
