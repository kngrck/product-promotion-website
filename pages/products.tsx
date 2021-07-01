import styled from "styled-components";
import ProductCard from "../components/product/product-card";
import { getAllProducts } from "../lib/products-util";
import { Product } from "../models/Product";
import ProductDialog from "../components/product/product-dialog";
import { useState } from "react";

function Products(props: { res: Product[]; error: any }) {
  const products = props.res;
  const emptyProduct: Product = {
    id: -1,
    name: "",
    description: "",
    count: 0,
    price: 0,
    imageUrl: "",
  };
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [open, setOpen] = useState(false);

  const selectedProduct = (p: Product) => {
    setProduct(p);
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Container>
      <ProductDialog
        open={open}
        closeHandler={closeHandler}
        product={product}
      />
      <GridContainer>
        {products && products.length > 0
          ? products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                selectedProduct={selectedProduct}
              />
            ))
          : "Ürün bulunamadı."}
      </GridContainer>
    </Container>
  );
}

export default Products;

export async function getStaticProps(context: any) {
  try {
    const res = await getAllProducts();
    return {
      props: { res, error: null },
    };
  } catch (error) {
    return {
      props: { res: null, error }, // will be passed to the page component as props
    };
  }
}

const Container = styled.div`
  background-color: #f2f2f2;
  padding-top: 100px;
  padding-bottom: 20px;
  min-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 30px;
  row-gap: 50px;
`;
