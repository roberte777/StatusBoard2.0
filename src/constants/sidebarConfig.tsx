import HomeIcon from "@mui/icons-material/Home";

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
            link: "/"
        }
    ]
];
export default config;
