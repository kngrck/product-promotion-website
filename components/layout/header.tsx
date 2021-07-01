import Link from "next/link";
import styled from "styled-components";
import { Typography, AppBar } from "@material-ui/core";
import { useRouter } from "next/router";

const linkList = [
  { name: "Ana Sayfa", href: "/", type: "round" },
  { name: "Ürünler", href: "/products", type: "normal" },
  { name: "Hakkımızda", href: "/about", type: "normal" },
  { name: "İletişim", href: "/contact", type: "normal" },
];

function Header() {
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname);
  return (
    <HeaderContainer>
      <LogoContainer />
      <nav>
        {linkList.map((l) => (
          <Link key={l.name} href={l.href}>
            <StyledLi active={pathname === l.href}>
              <Typography variant="h6">{l.name}</Typography>
            </StyledLi>
          </Link>
        ))}
      </nav>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  position: fixed;

  width: 100%;
  background-color: #fff;
  justify-content: flex-start;
  z-index: 3000;
  nav {
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 50%;
    justify-content: center;
    aling-items: center;
  }
`;

const LogoContainer = styled.div`
  margin-left: 40px;
  height: 70px;
  width: 70px;
  background-image: url("/images/logo.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledLi = styled.li`
  list-style-type: none;
  justify-content: center;

  cursor: pointer;
  padding: 10px 50px;

  border-bottom: ${(props) =>
    props.active ? "2px solid rgba(0,0,0,0.5)" : "0px"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
