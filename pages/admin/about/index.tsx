import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { isAuthenticated } from "../../../lib/auth";
import { getContents, updateContent } from "../../../lib/contents-util";
import { Content } from "../../../models/Content";
import { TextField, Typography, Button } from "@material-ui/core";

interface FormModel {
  about: string;
  aboutMission: string;
  aboutVision: string;
}

const formSchema = yup.object().shape({
  about: yup.string().required("Bu alan gerekli.").min(5, "En az 5 karakter."),
  aboutMission: yup
    .string()
    .required("Bu alan gerekli.")
    .min(5, "En az 5 karakter."),
  aboutVision: yup
    .string()
    .required("Bu alan gerekli.")
    .min(5, "En az 5 karakter."),
});

function AboutPage(props: { content: Content; error: any }) {
  const { content } = props;
  const {
    handleSubmit,
    formState: { errors },

    control,
  } = useForm({
    resolver: yupResolver(formSchema),

    defaultValues: {
      about: content.about,
      aboutMission: content.aboutMission,
      aboutVision: content.aboutVision,
    },
  });
  const onSubmitForm = async (data: FormModel) => {
    let edittedContent: Content = { ...content };
    edittedContent.about = data.about;
    edittedContent.aboutMission = data.aboutMission;
    edittedContent.aboutVision = data.aboutVision;

    try {
      await updateContent(edittedContent);
      alert("Güncellendi");
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };
  return (
    <Container>
      <Typography variant="h4">Hakkımızda</Typography>
      <Card onSubmit={handleSubmit(onSubmitForm)}>
        <Controller
          control={control}
          name="about"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="textarea"
                multiline
                variant="filled"
                label="Hakkımızda"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.about}
                helperText={errors.about && errors.about.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="aboutMission"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="textarea"
                multiline
                variant="filled"
                label="Misyonumuz"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.aboutMission}
                helperText={errors.aboutMission && errors.aboutMission.message}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="aboutVision"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                color="primary"
                type="textarea"
                multiline
                variant="filled"
                label="Vizyonumuz"
                InputLabelProps={{
                  style: { color: "#000" },
                }}
                error={!!errors.aboutVision}
                helperText={errors.aboutVision && errors.aboutVision.message}
              />
            );
          }}
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

export default AboutPage;

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
  min-height: 70%;
  width: 50%;
`;
