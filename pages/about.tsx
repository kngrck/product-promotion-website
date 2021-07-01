import styled from "styled-components";
import { getContents } from "../lib/contents-util";
import { Content } from "../models/Content";
import { Typography, Paper, Box } from "@material-ui/core";
import theme from "../lib/theme";

function About(props: { contents: Content; error: any }) {
  const { contents, error } = props;
  if (error) {
    alert(error);
  }
  return (
    <Container>
      <Box
        width="70%"
        minHeight="50%"
        padding={4}
        bgcolor={theme.palette.primary.light + "20" || "#f2f2f2"}
        borderRadius={10}
      >
        <Typography gutterBottom variant="h4">
          Hakkımızda
        </Typography>
        <Typography variant="body1">{contents.about}</Typography>
      </Box>
      <Box
        width="70%"
        minHeight="50%"
        padding={4}
        bgcolor={theme.palette.primary.light + "20" || "#f2f2f2"}
        borderRadius={10}
      >
        <Typography gutterBottom variant="h4">
          Misyonumuz & Vizyonumuz
        </Typography>
        <Typography variant="body1">{contents.aboutMission}</Typography>
        <Typography variant="body1">{contents.aboutVision}</Typography>
      </Box>
    </Container>
  );
}

export default About;

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
  min-height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
