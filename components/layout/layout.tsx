import styled from "styled-components";
import Header from "./header";

function Layout(props: any) {
  return (
    <Container>
      <Header />
      <main>{props.children}</main>
    </Container>
  );
}
export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
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
  main {
    height: 100%;
    width: 100%;
  }
`;
