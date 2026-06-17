import Container from "@mui/material/Container";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import CustomAppBar from "#/components/appbar";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					// Save current location for redirect after login
					redirect: location.href,
				},
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { auth } = Route.useRouteContext();
	const navigate = Route.useNavigate();

	const handleLogout = () => {
		auth.logout();
		navigate({ to: "/login", search: { redirect: undefined } });
	};

	return (
		<>
			<CustomAppBar onLogout={handleLogout} />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}
