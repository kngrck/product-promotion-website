import styled from "styled-components";
import { Product } from "../../../models/Product";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Button,
} from "@material-ui/core";

interface ProductListProps {
  products: Product[];
  editProductClick: any;
  addProductClick: any;
}

function ProductList(props: ProductListProps) {
  const { products, editProductClick, addProductClick } = props;
  return (
    <StyledTableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={addProductClick}
              >
                Ekle
              </Button>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h6">İsim</Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h6">Açıklama</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Adet</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Fiyat</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products ? (
            products.map((p, index) => (
              <StyledTableRow key={p.id} onClick={() => editProductClick(p)}>
                <TableCell>
                  <Typography variant="subtitle1">{index + 1}</Typography>
                </TableCell>
                <TableCell>
                  <ProductImage
                    image={p.imageUrl || "https://via.placeholder.com/300"}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{p.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{p.description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{p.count}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{p.price}</Typography>
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <tr>
              <td>Loading</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default ProductList;

const StyledTableContainer = styled(TableContainer)`
  &::-webkit-scrollbar {
    width: 10px;
    height: 13px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #3f50b5 14%, #757ce8 64%);
    border-radius: 2px;
    &:hover {
      background: linear-gradient(13deg, #757ce8 14%, #3f50b5 64%);
    }
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 2px;
    box-shadow: inset 7px 10px 12px 0px #f0f0f0;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #757ce8;
  }
`;

const ProductImage = styled.div`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 80px;
  width: 120px;
  border-radius: 5px;
`;
