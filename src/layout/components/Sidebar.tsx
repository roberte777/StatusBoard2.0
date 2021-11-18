import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import {
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton
} from "@mui/material";
import sidebarConfig from "../../constants/sidebarConfig";
import { ChevronLeft } from "@mui/icons-material";
interface Section {
    title: string;
    icon: any;
    link: string;
}
export default function sidebar({
    setDrawerOpen
}: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div>
            <Toolbar sx={{ justifyContent: "center", maxHeight: "100%" }}>
                <h2 style={{ maxHeight: "100%" }}>
                    {process.env.NEXT_PUBLIC_PAGE_NAME}
                </h2>
                <IconButton onClick={() => setDrawerOpen(false)}>
                    <ChevronLeft />
                </IconButton>
            </Toolbar>
            <Divider />
            {sidebarConfig.map((section: Section[], idx: number) => (
                <nav key={idx}>
                    <List key={idx}>
                        {section.map((subsection: Section, idx: number) => (
                            <Link href={subsection.link} key={idx}>
                                <a>
                                    <ListItem button key={subsection.title}>
                                        <ListItemIcon>
                                            {subsection.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={subsection.title}
                                        />
                                    </ListItem>
                                </a>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                </nav>
            ))}
        </div>
    );
}
