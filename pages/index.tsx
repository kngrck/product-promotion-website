import { GetServerSideProps } from "next";
import styled from "styled-components";
import ProductCard from "../components/product/product-card";
import { getContents } from "../lib/contents-util";
import { getAllProducts } from "../lib/products-util";
import { Content } from "../models/Content";
import { Product } from "../models/Product";
import { Typography } from "@material-ui/core";
import { useState } from "react";

import ProductDialog from "../components/product/product-dialog";
import { useRouter } from "next/router";
import theme from "../lib/theme";

export default function Home(props: {
  contents: Content;
  products: Product[];
  error: any;
}) {
  const router = useRouter();
  const { contents, products, error } = props;
  const emptyProduct: Product = {
    id: -1,
    name: "",
    description: "",
    count: 0,
    price: 0,
    imageUrl: "",
    imageName: "",
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
  if (error) {
    alert(error);
  }

  return (
    <Container>
      <ProductDialog
        open={open}
        closeHandler={closeHandler}
        product={product}
      />
      <FirstPage>
        <Card bgColor={theme.palette.primary.main}>
          <Typography gutterBottom variant="h4">
            {contents.homeHeader}
          </Typography>
          <Typography variant="body1" component="p">
            {contents.homeContent}
          </Typography>
        </Card>
      </FirstPage>
      <SecondPage>
        <section>
          <ProductsHeader
            color="textSecondary"
            variant="h4"
            onClick={() => {
              router.push("/products");
            }}
          >
            Ürünlere göz at
          </ProductsHeader>
        </section>
        <ProductsContainer>
          {products &&
            products.length > 0 &&
            products.map((p, i) => {
              if (i < 5) {
                return (
                  <ProductCard
                    key={p.id}
                    product={p}
                    selectedProduct={selectedProduct}
                  />
                );
              }
            })}
        </ProductsContainer>
      </SecondPage>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const products = await getAllProducts();
    const contents = await getContents();
    return {
      props: { contents, products, error: null },
    };
  } catch (error) {
    return {
      props: { products: null, contents: null, error }, // will be passed to the page component as props
    };
  }
};

const Container = styled.div`
  height: 200%;
`;

const FirstPage = styled.div`
  height: 50%;
  background-image: url("/images/bg2.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 100px 20px;
`;

const Card = styled.div`
  padding: 20px;
  width: 50%;
  height: 50%;
  background-color: ${(props) =>
    props.bgColor + "99" || "rgba(122, 93, 90, 0.794)"};

  border-radius: 20px;
  border: 1px gray;
  p {
    word-wrap: break-word;
  }
`;

const SecondPage = styled.div`
  height: 50%;
  background-image: url("/images/bg1.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h2 {
    color: white;
    margin: 0;
  }
`;

const ProductsHeader = styled(Typography)`
  cursor: pointer;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 50px;
`;
