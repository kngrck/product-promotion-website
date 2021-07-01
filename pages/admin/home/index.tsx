import { GetServerSideProps } from "next";
import styled from "styled-components";
import { isAuthenticated } from "../../../lib/auth";
import * as yup from "yup";
import { getContents } from "../../../lib/contents-util";
import { Content } from "../../../models/Content";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { updateContent } from "../../../lib/contents-util";
import { Typography, TextField, Button } from "@material-ui/core";
import { useState } from "react";

interface FormModel {
  homeHeader: string;
  homeContent: string;
}

const formSchema = yup.object().shape({
  homeHeader: yup.string().required("Bu alan gerekli."),
  homeContent: yup.string().required("Bu alan gerekli."),
});

function HomePage(props: { content: Content; error: any }) {
  const { content } = props;

  const {
    handleSubmit,
    formState: { errors },

    control,
  } = useForm({
    resolver: yupResolver(formSchema),

    defaultValues: {
      homeHeader: content.homeHeader,
      homeContent: content.homeContent,
    },
  });

  const onSubmitForm = async (data: FormModel) => {
    let edittedContent: Content = { ...content };
    edittedContent.homeHeader = data.homeHeader;
    edittedContent.homeContent = data.homeContent;

    try {
      await updateContent(edittedContent);
      alert("Güncellendi");
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Ana Sayfa İçerikleri</Typography>

      <Card onSubmit={handleSubmit(onSubmitForm)}>
        <Controller
          control={control}
          name="homeHeader"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="text"
                variant="filled"
                label="Başlık"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.homeHeader}
                helperText={errors.homeHeader && errors.homeHeader.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="homeContent"
          render={({ field }) => (
            <TextField
              fullWidth
              {...field}
              multiline
              color="primary"
              type="textarea"
              variant="filled"
              label="İçerik"
              InputLabelProps={{
                style: { color: "#000" },
              }}
              error={!!errors.homeContent}
              helperText={errors.homeContent && errors.homeContent.message}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
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

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  justify-content: space-evenly;
  height: 100%;
`;

const ImageContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 250px;
  width: 500px;
  border-radius: 5px;
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
