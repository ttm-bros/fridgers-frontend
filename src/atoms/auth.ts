import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { sessionStorage } from "./_storage";

export type AuthenticatedUser = {
	email: string;
};

export type AuthState =
	| {
			isAuthenticated: true;
			user: AuthenticatedUser;
			token: string;
	  }
	| {
			isAuthenticated: false;
			user: null;
			token: null;
	  };

export const authAtom = atomWithStorage<AuthState>(
	"auth",
	{
		isAuthenticated: false,
		user: null,
		token: null,
	},
	sessionStorage<AuthState>(),
);
