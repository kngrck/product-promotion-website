import styled from "styled-components";
import { Product } from "../../models/Product";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

function ProductCard(props: { selectedProduct: any; product: Product }) {
  const { product, selectedProduct } = props;

  return (
    <StyledCard onClick={() => selectedProduct(product)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          src={product.imageUrl}
          title={product.name}
        />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
        </CardContent>
      </CardActionArea>
      <StyledCardActions>
        <Typography variant="h6">Adet: {product.count}</Typography>
        <Typography variant="h6">{product.price} TL</Typography>
      </StyledCardActions>
    </StyledCard>
  );
}

export default ProductCard;

const StyledCard = styled(Card)`
  max-height: 500px;
  min-height: 300px;
  max-width: 300px;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;
