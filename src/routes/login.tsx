import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { type SxProps, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm } from "#/components/forms/login";

export const Route = createFileRoute("/login")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || undefined,
	}),
	beforeLoad: ({ context, search }) => {
		// Redirect if already authenticated
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect || "/" });
		}
	},
	component: Login,
});

const containerStyles: SxProps = {
	height: "100dvh",
	width: "100dvw",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function Login() {
	const { auth } = Route.useRouteContext();
	const navigate = Route.useNavigate();
	const { redirect } = Route.useSearch();

	const handleLogin = (email: string, password: string) => {
		auth.login(email, password, () => {
			navigate({ to: redirect || "/", search: { redirect: undefined } });
		});
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return <LoginPage isMobile={isMobile} handleLogin={handleLogin} />;
}

function LoginPage({
	isMobile,
	handleLogin,
}: {
	isMobile: boolean;
	handleLogin: (email: string, password: string) => void;
}) {
	const title = isMobile ? "Login Page (Mobile)" : "Login Page (Desktop)";

	return (
		<Container sx={containerStyles}>
			<Stack
				direction={isMobile ? "column" : "row"}
				spacing={4}
				sx={{ alignItems: "center" }}
			>
				<Typography variant="h4">{title}</Typography>

				<Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />

				{/* <LoginForm /> */}
				<Box sx={{ width: 360, maxWidth: "100%" }}>
					<LoginForm onLogin={handleLogin} />
				</Box>
			</Stack>
		</Container>
	);
}
