import LeftMenu from "./left-menu";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import styled from "styled-components";

function AdminLayout(props: any) {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) {
    return <div>...Loading</div>;
  }

  // if (!session) {
  //   if (router.pathname !== "/admin") {
  //     return (
  //       <div>
  //         <h2>You are not authenticated</h2>
  //         <Link href="/admin">Login</Link>
  //       </div>
  //     );
  //   }
  // }
  if (!session) {
    return (
      <NoAuthContainer>
        <main>{props.children}</main>
      </NoAuthContainer>
    );
  }
  return (
    <Container>
      <LeftMenuContainer>
        <LeftMenu />
      </LeftMenuContainer>

      <main>{props.children}</main>
    </Container>
  );
}

export default AdminLayout;

const Container = styled.div`
  display: grid;

  height: 100%;
  grid-template-areas: "menu main";
  grid-template-columns: 2fr 8fr;
  main {
    overflow: hidden;
    grid-area: main;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 100px 1fr;
  }
`;

const NoAuthContainer = styled.div`
  display: grid;

  height: 100%;

  grid-template-areas: "main";

  grid-template-columns: 1fr;
  main {
    grid-area: main;
  }
`;

const LeftMenuContainer = styled.div`
  height: 100%;
  grid-area: menu;
`;
