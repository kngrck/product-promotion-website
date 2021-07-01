import React, { useEffect, useState } from "react";
import { Product } from "../../../models/Product";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Input,
  Grid,
} from "@material-ui/core";

import styled from "styled-components";

interface ProductDetailProps {
  editMode: boolean;
  product: Product | null | undefined;
  open: any;
  onClose: any;
  onDelete: any;
  editProductApply: any;
}

interface FormModel {
  name: string;
  description: string;
  count: number;
  price: number;
}

const formSchema = yup.object().shape({
  name: yup.string().required("Bu alan gerekli."),
  description: yup.string().required("Bu alan gerekli."),
  count: yup
    .number()
    .typeError("Sayı olmalı!")
    .integer("Tam sayı olmalı!")
    .positive("Pozitif bir sayı olmalı!")
    .moreThan(0, "Sıfırdan büyük bir sayı olmalı!")
    .required("Bu alan gerekli."),
  price: yup
    .number()
    .typeError("Sayı olmalı!")
    .positive("Pozitif bir sayı olmalı.")
    .moreThan(0, "Sıfırdan büyük bir sayı olmalı.")
    .required("Bu alan gerekli."),
});

function ProductDetail(props: ProductDetailProps) {
  const { product, open, onClose, editMode } = props;
  const [productDetails, setProductDetails] = useState<Product>({
    id: -1,
    name: "",
    description: "",
    imageName: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });
  const [productUploadImage, setProductUploadImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(formSchema),

    defaultValues: {
      name: productDetails.name,
      description: productDetails.description,
      count: productDetails.count,
      price: productDetails.price,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setValue("name", product.name, { shouldValidate: true });
      setValue("description", product.description, { shouldValidate: true });
      setValue("count", product.count, { shouldValidate: true });
      setValue("price", product.price, { shouldValidate: true });
      setProductDetails(product);
    } else {
      const emptyProduct: Product = {
        id: -1,
        name: "",
        description: "",
        imageName: "",
        imageUrl: "",
        count: 0,
        price: 0,
      };
      setProductDetails(emptyProduct);
    }
  }, [product]);

  const onSubmitForm = async (data: FormModel) => {
    const edittedProduct: Product = {
      id: productDetails.id,
      name: data.name,
      description: data.description,
      imageName: productDetails.imageName,
      imageUrl: productDetails.imageUrl,
      count: data.count,
      price: data.price,
    };
    setLoading(true);
    try {
      await props.editProductApply(
        edittedProduct,
        editMode,
        productUploadImage
      );
      reset();
    } catch (e) {
      alert(e);
    }
    setLoading(false);
    setProductDetails({
      id: -1,
      name: "",
      description: "",
      imageName: "",
      imageUrl: "",
      count: 0,
      price: 0,
    });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setProductUploadImage(e.target.files[0]);
      let updatedProduct = { ...productDetails };
      updatedProduct.imageUrl = URL.createObjectURL(e.target.files[0]);
      setProductDetails(updatedProduct);
    }
  };

  const deleteHandler = async () => {
    await props.onDelete(productDetails);
    reset();
  };

  const closeHandler = () => {
    reset();
    setProductUploadImage(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? "Ürünü Düzenle" : "Ürün Ekle"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Grid container spacing={1}>
            <Grid container item xs={6} spacing={3}>
              <Grid item>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        color="primary"
                        type="text"
                        variant="filled"
                        label="İsim"
                        InputLabelProps={{
                          style: { color: "#000" },
                        }}
                        error={!!errors.name}
                        helperText={errors.name && errors.name.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        color="primary"
                        type="textarea"
                        multiline
                        rowsMax={5}
                        variant="filled"
                        label="Açıklama"
                        InputLabelProps={{
                          style: { color: "#000" },
                        }}
                        error={!!errors.description}
                        helperText={
                          errors.description && errors.description.message
                        }
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="count"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        color="primary"
                        type="text"
                        variant="filled"
                        label="Adet"
                        InputLabelProps={{
                          style: { color: "#000" },
                        }}
                        error={!!errors.count}
                        helperText={errors.count && errors.count.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="price"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        color="primary"
                        type="text"
                        variant="filled"
                        label="Fiyat"
                        InputLabelProps={{
                          style: { color: "#000" },
                        }}
                        error={!!errors.price}
                        helperText={errors.price && errors.price.message}
                      />
                    );
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item direction="column" xs={6} spacing={3}>
              <Grid item>
                <InputContainer>
                  <label htmlFor="bg1">Resim</label>

                  <Input
                    accept="image/*"
                    id="bg1"
                    type="file"
                    onChange={handleImageChange}
                  />
                </InputContainer>
              </Grid>
              <Grid item>
                <ImageContainer
                  image={
                    productDetails.imageUrl.length > 0
                      ? productDetails.imageUrl
                      : "https://via.placeholder.com/300"
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            {editMode && (
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={deleteHandler}
              >
                Sil
              </Button>
            )}
            <Button
              type="button"
              variant="contained"
              color="inherit"
              onClick={closeHandler}
            >
              İptal
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {editMode ? "Onayla" : "Ekle"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetail;

const ImageContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 300px;
  border-radius: 5px;
`;

const InputContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
