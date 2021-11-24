import {
  Home as HomeIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

interface Section {
  title: string;
  icon: any;
  link: string;
}

const config: Section[][] = [
  [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      title: "Status Board",
      icon: <InfoIcon />,
      link: "/StatusBoard",
    },
  ],
  [{ title: "Admin", icon: <SecurityIcon />, link: "Admin" }],
];
export default config;
