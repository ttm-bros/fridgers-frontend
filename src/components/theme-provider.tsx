// ref: https://tanstack.com/router/latest/docs/how-to/integrate-material-ui#step-2-set-up-theme-provider
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#198bd2",
		},
		secondary: {
			main: "#dc004e",
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
	},
	components: {
		// Customize components for router integration
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none", // More modern button styling
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration: "none",
					"&:hover": {
						textDecoration: "underline",
					},
				},
			},
		},
	},
});

interface MuiThemeProviderProps {
	children: ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
