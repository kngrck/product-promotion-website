import styled from "styled-components";
import { getContents } from "../lib/contents-util";
import { Content } from "../models/Content";
import { Typography, Box, TextField, Button } from "@material-ui/core";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import theme from "../lib/theme";
import { Message } from "../models/Message";
import { addMessage } from "../lib/messages-util";

interface FormModel {
  senderFullName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderMessage: string;
}

const formSchema = yup.object().shape({
  senderFullName: yup
    .string()
    .required("Bu alan gerekli.")
    .min(3, "En az 3 karakter."),
  senderEmail: yup
    .string()
    .required("Bu alan gerekli.")
    .email("Geçerli bir email giriniz."),
  senderPhone: yup
    .string()
    .required("Bu alan gerekli.")
    .min(3, "En az 3 karakter."),
  senderAddress: yup
    .string()
    .required("Bu alan gerekli.")
    .min(5, "En az 5 karakter."),
  senderMessage: yup
    .string()
    .required("Bu alan gerekli.")
    .min(15, "En az 15 karakter.")
    .max(150, "En fazla 150 karakter."),
});

function Contact(props: { contents: Content; error: any }) {
  const { contents, error } = props;
  if (error) {
    alert(error);
  }
  const {
    handleSubmit,
    formState: { errors },

    control,
  } = useForm({
    resolver: yupResolver(formSchema),

    defaultValues: {
      senderFullName: "",
      senderEmail: "",
      senderPhone: "",
      senderAddress: "",
      senderMessage: "",
    },
  });

  const onSubmitForm = async (data: FormModel) => {
    const newMessage: Message = {
      id: -1,
      senderFullName: data.senderFullName,
      senderEmail: data.senderEmail,
      senderPhone: data.senderPhone,
      senderAddress: data.senderAddress,
      senderMessage: data.senderMessage,
    };

    try {
      await addMessage(newMessage);
      alert("Mesaj yollandı.");
    } catch (error) {
      alert("Bir hata oluştu");
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        width="40%"
        minHeight="50%"
        padding={2}
        bgcolor={theme.palette.primary.light + "20" || "#f2f2f2"}
        borderRadius={10}
      >
        <Typography gutterBottom variant="h4">
          İletişim
        </Typography>
        <Typography gutterBottom variant="h6">
          Telefon
        </Typography>
        <Typography variant="body1">{contents.contactPhone}</Typography>
        {contents.contactPhoneSecond.length > 0 && (
          <Typography variant="body1">{contents.contactPhoneSecond}</Typography>
        )}
        {contents.contactFax.length > 0 && (
          <Typography gutterBottom variant="h6">
            Fax<Typography variant="body1">{contents.contactFax}</Typography>
          </Typography>
        )}

        <Typography gutterBottom variant="h6">
          Email
        </Typography>
        <Typography variant="body1">{contents.contactMail}</Typography>
        {contents.contactMailSecond.length > 0 && (
          <Typography variant="body1">{contents.contactMailSecond}</Typography>
        )}

        <Typography gutterBottom variant="h6">
          Adres
        </Typography>
        <Typography variant="body1">{contents.contactAddress}</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        width="40%"
        minHeight="50%"
        padding={2}
        bgcolor={theme.palette.primary.light + "20" || "#f2f2f2"}
        borderRadius={10}
      >
        <Box alignSelf="start">
          <Typography gutterBottom variant="h4">
            Mesaj Yolla
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Box marginTop={2}>
            <Controller
              control={control}
              name="senderFullName"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  color="primary"
                  type="text"
                  variant="standard"
                  label="İsim Soyisim"
                  InputLabelProps={{
                    style: { color: "#000" },
                  }}
                  error={!!errors.senderFullName}
                  helperText={
                    errors.senderFullName && errors.senderFullName.message
                  }
                />
              )}
            />
          </Box>
          <Box marginTop={2}>
            <Controller
              control={control}
              name="senderEmail"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  color="primary"
                  type="text"
                  variant="standard"
                  label="Email"
                  InputLabelProps={{
                    style: { color: "#000" },
                  }}
                  error={!!errors.senderEmail}
                  helperText={errors.senderEmail && errors.senderEmail.message}
                />
              )}
            />
          </Box>
          <Box marginTop={2}>
            <Controller
              control={control}
              name="senderPhone"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  color="primary"
                  type="text"
                  variant="standard"
                  label="Telefon"
                  InputLabelProps={{
                    style: { color: "#000" },
                  }}
                  error={!!errors.senderPhone}
                  helperText={errors.senderPhone && errors.senderPhone.message}
                />
              )}
            />
          </Box>
          <Box marginTop={2}>
            <Controller
              control={control}
              name="senderAddress"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  multiline
                  color="primary"
                  type="textarea"
                  variant="standard"
                  label="Adresiniz"
                  InputLabelProps={{
                    style: { color: "#000" },
                  }}
                  error={!!errors.senderAddress}
                  helperText={
                    errors.senderAddress && errors.senderAddress.message
                  }
                />
              )}
            />
          </Box>
          <Box marginTop={2}>
            <Controller
              control={control}
              name="senderMessage"
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  multiline
                  color="primary"
                  type="textarea"
                  variant="standard"
                  label="Mesaj"
                  InputLabelProps={{
                    style: { color: "#000" },
                  }}
                  error={!!errors.senderMessage}
                  helperText={
                    errors.senderMessage && errors.senderMessage.message
                  }
                />
              )}
            />
          </Box>
          <Button type="submit" color="primary" variant="text">
            Gönder
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Contact;

export async function getStaticProps(context: any) {
  try {
    const contents = await getContents();
    return {
      props: { contents, error: null },
    };
  } catch (error) {
    return {
      props: { contents: null, error }, // will be passed to the page component as props
    };
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  height: 100%;
  width: 100%;
  form {
    width: 50%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    input {
      width: 40%;
    }
  }
`;

const SubContainer = styled.div`
  width: 50%;
`;
