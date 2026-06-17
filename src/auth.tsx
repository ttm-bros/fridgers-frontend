import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAtom } from "jotai";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { authAtom } from "./atoms/auth";

interface User {
	email: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	login: (
		email: string,
		password: string,
		onSuccess: () => void,
	) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [auth, setAuth] = useAtom(authAtom);
	const [isLoading, setIsLoading] = useState(true);

	// Restore auth state on app load
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, []);

	// Show loading state while checking auth
	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	const login = async (
		email: string,
		password: string,
		onSuccess: () => void,
	) => {
		// TODO: 認証API処理を実装
		if (email === "user@example.com" && password === "password") {
			setAuth({
				isAuthenticated: true,
				user: { email },
				token: "dummy-token",
			});
			onSuccess();
		} else {
			throw new Error("Authentication failed");
		}
	};

	const logout = () => {
		setAuth((prev) => ({
			...prev,
			user: null,
			isAuthenticated: false,
			token: null,
		}));
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: auth.isAuthenticated,
				user: auth.user,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
