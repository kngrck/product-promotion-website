import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { isAuthenticated } from "../../../lib/auth";
import { getContents, updateContent } from "../../../lib/contents-util";
import { Content } from "../../../models/Content";
import { Typography, TextField, Button } from "@material-ui/core";

interface FormModel {
  contactPhone: string;
  contactAddress: string;
  contactMail: string;
  contactPhoneSecond: string;
  contactMailSecond: string;
  contactFax: string;
}

const formSchema = yup.object().shape({
  contactPhone: yup
    .string()
    .required("Bu alan gerekli.")
    .min(3, "Minimum 3 karakter olmalı"),
  contactAddress: yup
    .string()
    .required("Bu alan gerekli.")
    .min(3, "Minimum 3 karakter olmalı"),
  contactMail: yup
    .string()
    .required("Bu alan gerekli.")
    .email("Geçerli bir email giriniz."),
  contactPhoneSecond: yup.string(),
  contactMailSecond: yup.string(),
  contactFax: yup.string(),
});

function ContactPage(props: { content: Content; error: any }) {
  const { content } = props;
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
      contactPhone: content.contactPhone,
      contactAddress: content.contactAddress,
      contactMail: content.contactMail,
      contactPhoneSecond: content.contactPhoneSecond,
      contactMailSecond: content.contactMailSecond,
      contactFax: content.contactFax,
    },
  });

  const onSubmitForm = async (data: FormModel) => {
    let edittedContent: Content = { ...content };
    edittedContent.contactPhone = data.contactPhone;
    edittedContent.contactAddress = data.contactAddress;
    edittedContent.contactMail = data.contactMail;
    edittedContent.contactPhoneSecond = data.contactPhoneSecond;
    edittedContent.contactMailSecond = data.contactMailSecond;
    edittedContent.contactFax = data.contactFax;

    try {
      await updateContent(edittedContent);
      alert("Güncellendi");
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };
  return (
    <Container>
      <Typography variant="h4">İletişim Bilgileri</Typography>
      <Card onSubmit={handleSubmit(onSubmitForm)}>
        <Controller
          control={control}
          name="contactPhone"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="text"
                variant="filled"
                label="Telefon No"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone && errors.contactPhone.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="contactMail"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="text"
                variant="filled"
                label="E-mail"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.contactMail}
                helperText={errors.contactMail && errors.contactMail.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="contactAddress"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="textarea"
                variant="filled"
                label="Adres"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.contactAddress}
                helperText={
                  errors.contactAddress && errors.contactAddress.message
                }
              />
            );
          }}
        />

        <Controller
          control={control}
          name="contactPhoneSecond"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="text"
                variant="filled"
                label="Telefon No 2 (Boş bırakabilirsiniz.)"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.contactPhoneSecond}
                helperText={
                  errors.contactPhoneSecond && errors.contactPhoneSecond.message
                }
              />
            );
          }}
        />

        <Controller
          control={control}
          name="contactMailSecond"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="text"
                variant="filled"
                label="E-mail 2 (Boş bırakabilirsiniz.)"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.contactMailSecond}
                helperText={
                  errors.contactMailSecond && errors.contactMailSecond.message
                }
              />
            );
          }}
        />

        <Controller
          control={control}
          name="contactFax"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="text"
                variant="filled"
                label="Fax (Boş bırakabilirsiniz.)"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.contactFax}
                helperText={errors.contactFax && errors.contactFax.message}
              />
            );
          }}
        />
        <Button type="submit" color="primary" variant="contained">
          Güncelle
        </Button>
      </Card>
      <div />
    </Container>
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
    const content = await getContents();
    return { props: { content, error: null } };
  } catch (error) {
    return { props: { content: null, error } };
  }
};

export default ContactPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  justify-content: space-evenly;
  height: 100%;
`;
const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-self: center;
  justify-self: center;
  min-height: 60%;
  width: 50%;
  padding: 20px 20px;
  border-radius: 10px;
  //box-shadow: 6px 7px 8px -5px rgba(0, 0, 0, 0.52);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
