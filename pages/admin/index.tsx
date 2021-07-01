import { useRef } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { GetServerSideProps } from "next";
import { isAuthenticated } from "../../lib/auth";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { TextField, Button, Typography } from "@material-ui/core";

interface FormModel {
  email: string;
  password: string;
}

const formSchema = yup.object().shape({
  email: yup.string().required("Bu alan gerekli."),
  password: yup.string().required("Bu alan gerekli."),
});
function AuthPage() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },

    control,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = async (data: FormModel) => {
    try {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.replace("/admin/home");
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  return (
    <Container>
      <Card onSubmit={handleSubmit(onSubmitForm)}>
        <Typography variant="h6">Admin Panel Giriş</Typography>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              type="text"
              variant="filled"
              label="E-mail"
              InputLabelProps={{
                style: { color: "#000" },
              }}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              color="primary"
              type="password"
              variant="filled"
              label="Şifre"
              InputLabelProps={{
                style: { color: "#000" },
              }}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Giriş
        </Button>
      </Card>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (await isAuthenticated(context.req)) {
    return {
      redirect: {
        destination: "/admin/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 30%;
  height: 30%;
`;

export default AuthPage;
