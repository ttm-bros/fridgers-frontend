import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";
import { MuiThemeProvider } from "#/components/theme-provider";

export const Route = createRootRoute({
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
