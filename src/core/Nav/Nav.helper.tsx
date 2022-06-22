import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";

import { signOut } from "../../data/data.crud";

interface NavListConfigItem {
  text: string;
  subtext?: string;
  icon?: JSX.Element;
  callback?: () => void;
}

export function configuredNavList(handleOpenSettings: () => void) {
  const config: Array<NavListConfigItem> = [
    {
      text: "Settings",
      icon: <Settings />,
      callback: handleOpenSettings,
    },
    {
      text: "Logout",
      icon: <Logout />,
      callback: signOut,
    },
  ];
  return navListRenderer(config);
}

function navListRenderer(navListConfig: Array<NavListConfigItem>) {
  return (
    <List>
      {navListConfig.map(({ icon, text, subtext, callback }, key) => (
        <ListItem disablePadding key={key} onClick={callback}>
          <ListItemButton>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : <></>}
            <ListItemText primary={text} secondary={subtext ?? ""} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
