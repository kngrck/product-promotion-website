import { GetServerSideProps } from "next";

import { useEffect, useState } from "react";
import styled from "styled-components";

import ProductDetail from "../../../components/admin/products/product-detail";
import ProductList from "../../../components/admin/products/product-list";
import { isAuthenticated } from "../../../lib/auth";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../../../lib/products-util";
import { Product } from "../../../models/Product";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";

interface ProductsPageProps {
  products: Product[];
}

function ProductsPage(props: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>(props.products);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickedProduct, setPickedProduct] = useState<
    Product | null | undefined
  >();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts: Product[] = await getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, [refresh]);

  const editProductApply = async (
    edittedProduct: Product,
    update: boolean,
    image: File | null
  ) => {
    setLoading(true);
    setOpen(false);
    try {
      if (!update) {
        if (!image) {
          throw new Error("Resim seciniz");
        }
        await addProduct(edittedProduct, image);
        alert("Ürün eklendi.");
      } else {
        await updateProduct(edittedProduct, image);
        alert("Ürün guncellendi.");
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
    setPickedProduct(null);
    setRefresh((refresh) => !refresh);
  };

  const onDeleteProduct = async (deletedProduct: Product) => {
    if (confirm("Silmek istediğinize emin misiniz ?") == true) {
      try {
        await deleteProduct(deletedProduct);
      } catch (error) {
        alert(error);
      }
      setPickedProduct(null);
      setRefresh((refresh) => !refresh);
      setOpen(false);
    }
  };

  const editProductClick = (p: Product) => {
    setPickedProduct(p);
    setOpen(true);
  };

  const closeProductDetail = () => {
    setPickedProduct(null);
    setOpen(false);
  };

  return (
    <>
      <StyledBackdrop open={loading}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>

      <Container>
        <Typography variant="h4">Ürünleriniz</Typography>
        <ProductDetail
          editMode={pickedProduct ? true : false}
          open={open}
          onClose={closeProductDetail}
          product={pickedProduct}
          editProductApply={editProductApply}
          onDelete={onDeleteProduct}
        />
        {!loading && (
          <ProductList
            products={products}
            editProductClick={editProductClick}
            addProductClick={() => setOpen(true)}
          />
        )}
        <div />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!(await isAuthenticated(context.req))) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  try {
    const fetchedProducts: Product[] = await getAllProducts();
    return {
      props: {
        products: fetchedProducts,
      },
    };
  } catch (error) {
    return {
      props: {
        products: error,
      },
    };
  }
};

export default ProductsPage;

const StyledBackdrop = styled(Backdrop)`
  zindex: 40000;
  color: "#fff";
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: space-evenly;
  height: 100%;

  overflow: hidden;
`;
