import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import styled from "styled-components";
import { Product } from "../../models/Product";
interface ProductDialogProps {
  open: boolean;
  closeHandler: any;
  product: Product;
}
function ProductDialog(props: ProductDialogProps) {
  const { open, closeHandler, product } = props;

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth="md">
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <StyledImage src={product.imageUrl} />
        <Typography variant="body1">{product.description}</Typography>
      </DialogContent>
      <StyledDialogActions>
        <Typography variant="h6">
          Adet <Typography variant="body1">{product.count}</Typography>
        </Typography>
        <Divider />
        <Typography variant="h6">
          Fiyat <Typography variant="body1">{product.price} TL</Typography>
        </Typography>
      </StyledDialogActions>
    </Dialog>
  );
}

export default ProductDialog;

const StyledImage = styled.img`
  max-height: 600px;
  max-width: 600px;
`;
const Divider = styled.div`
  flex: 1;
`;

const StyledDialogActions = styled(DialogActions)`
  background-color: rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
