import { createJSONStorage } from "jotai/utils";

export const sessionStorage = <T>() => {
	if (typeof window !== "undefined") {
		return createJSONStorage<T>(() => window.sessionStorage);
	}
	return undefined;
};
