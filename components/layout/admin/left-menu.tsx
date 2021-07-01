import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import HomeIcon from "../../icons/menu-icons/home-icon.js";
import DashboardIcon from "../../icons/menu-icons/dashboard-icon";
import ContactIcon from "../../icons/menu-icons/contact-icon";
import AboutIcon from "../../icons/menu-icons/about-icon";
import ProductsIcon from "../../icons/menu-icons/products-icon";
import MailIcon from "../../icons/menu-icons/mail-icon";
import UsersIcon from "../../icons/menu-icons/users-icons";
import SettingsIcon from "../../icons/menu-icons/settings-icon";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Container,
  Divider,
} from "@material-ui/core";

function LeftMenu() {
  const router = useRouter();
  const pathname = router.pathname;
  const menuBuilder = [
    {
      href: "/admin/home",
      title: "Ana Sayfa",
      icon: <HomeIcon color="#f2f2f2" />,
    },
    {
      href: "/admin/products",
      title: "Ürünleriniz",
      icon: <ProductsIcon color="#f2f2f2" />,
    },
    {
      href: "/admin/about",
      title: "Hakkımızda",
      icon: <AboutIcon color="#f2f2f2" />,
    },
    {
      href: "/admin/contact",
      title: "İletişim",
      icon: <ContactIcon color="#f2f2f2" />,
    },
    {
      href: "/admin/messages",
      title: "Mesajlar",
      icon: <MailIcon color="#f2f2f2" />,
    },
  ];
  const menuItem = (href: any, title: String, icon: any) => {
    return (
      <Box key={href} bgcolor={pathname === href ? "#757ce8" : "#3f50b5"}>
        <ListItem button onClick={() => router.push(href)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <Typography color="textSecondary" variant="h5">
              {title}
            </Typography>
          </ListItemText>
        </ListItem>
      </Box>
    );
  };

  return (
    <Box
      bgcolor="#3f50b5"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      //alignItems="center"
    >
      <HeaderContainer>
        <Typography color="textSecondary" variant="h4">
          Admin Panel
        </Typography>
        <SettingsIcon stroke="#c8cdd0" />
      </HeaderContainer>
      <StyledList>
        {menuBuilder.map((m) => menuItem(m.href, m.title, m.icon))}
      </StyledList>
      <ListItem button onClick={signOut}>
        <ListItemText>
          <Typography color="textSecondary" variant="h5">
            Çıkış Yap
          </Typography>
        </ListItemText>
      </ListItem>
    </Box>
  );
}

export default LeftMenu;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 8px;
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
