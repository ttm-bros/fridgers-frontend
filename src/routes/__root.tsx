import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";
import { MuiThemeProvider } from "#/components/theme-provider";

interface AuthState {
	isAuthenticated: boolean;
	user: { email: string } | null;
	login: (
		username: string,
		password: string,
		onSuccess: () => void,
	) => Promise<void>;
	logout: () => void;
}

interface RouteContext {
	auth: AuthState;
}

export const Route = createRootRouteWithContext<RouteContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<MuiThemeProvider>
			<Outlet />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</MuiThemeProvider>
	);
}
