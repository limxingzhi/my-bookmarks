// code from https://mui.com/material-ui/react-drawer/#persistent-drawer

import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

import { css } from "@emotion/css";

import { getFlexed, unselectableStyled } from "../../sharedStyles";
import { GlobalState } from "../../utils/useGlobalState";
import { configuredNavList } from "./Nav.helper";

const drawerWidth = 240;

const boxStyle = css({
  height: "calc(100vh - env(safe-area-inset-bottom))",
});

const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface NavProps extends GotChildren {
  handleOpenSettings: () => void;
}

export default function PersistantDrawer({
  children,
  handleOpenSettings,
}: NavProps) {
  const [open, setOpen] = useState(false);

  const [{ title }] = useContext(GlobalState);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} className={boxStyle}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={unselectableStyled}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {configuredNavList(handleOpenSettings)}
      </Drawer>
      <Main open={open} className={mainStyle}>
        <DrawerHeader />
        <div
          className={css({
            ...getFlexed(),
            display: "block",
            overflow: "hidden",
          })}
        >
          {children}
        </div>
      </Main>
    </Box>
  );
}
