"use client";
import React from "react";
import {
  Card,
  CardContent,
  // Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Settings, History, Logout, Password } from "@mui/icons-material";
import Link from "next/link";
interface AccountBlockProps {
  onLogout?: () => void;
}
const links = [
  { title: "Profile", path: "/user/profile", icon: <Settings /> },
  { title: "Reservations", path: "/user/reservations", icon: <History /> },
  { title: "Password", path: "/user/password", icon: <Password /> },
];
const AccountBlock: React.FC<AccountBlockProps> = ({ onLogout }) => {
  return (
    <Card className="">
      <CardContent>
        {/* <Typography variant="h6" className="mb-4">
          Account Settings
        </Typography> */}
        <List>
          {links.map((link: any, idx: number) => {
            return (
              <div key={idx}>
                <ListItem>
                  <ListItemIcon>{link?.icon}</ListItemIcon>
                  <Link href={link.path}>{link.title}</Link>
                </ListItem>

                <Divider />
              </div>
            );
          })}

          <ListItem
            component="button"
            className="text-red-500"
            onClick={onLogout}
          >
            <ListItemIcon>
              <Logout className="text-red-500" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default AccountBlock;
