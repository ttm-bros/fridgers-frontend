import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

const CustomAppBar: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Fridgers
				</Typography>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="user menu"
					onClick={handleMenu}
				>
					<AccountCircle />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<Stack
						direction="row"
						spacing={2}
						sx={{ paddingX: 2, paddingY: 1, alignItems: "center" }}
					>
						<Avatar />
						<Typography>hoge@example.com</Typography>
					</Stack>
					<Divider />
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default CustomAppBar;
