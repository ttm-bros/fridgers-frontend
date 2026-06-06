import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "@tanstack/react-form";
import { loginFormDefaultValues, loginFormSchema } from "./schema";

type LoginFormProps = {
	onLogin: (email: string, password: string) => void;
};

export const LoginForm = ({ onLogin }: LoginFormProps) => {
	const form = useForm({
		defaultValues: {
			email: loginFormDefaultValues.email,
			password: loginFormDefaultValues.password,
		},
		onSubmit: (values) => {
			console.log("Form submitted with values:", values);
			onLogin(values.value.email, values.value.password);
		},
		validators: {
			onChange: loginFormSchema,
		},
	});

	return (
		<Stack spacing={2}>
			<form.Field
				name="email"
				// biome-ignore lint/correctness/noChildrenProp: This is how the form library expects it to be used.
				children={({ state, handleChange, handleBlur }) => (
					<TextField
						label="Email"
						defaultValue={state.value}
						error={!!state.meta.errors.length}
						helperText={state.meta.errors[0]?.message}
						onChange={(e) => handleChange(e.target.value)}
						onBlur={handleBlur}
					/>
				)}
			/>
			<form.Field
				name="password"
				// biome-ignore lint/correctness/noChildrenProp: This is how the form library expects it to be used.
				children={({ state, handleChange, handleBlur }) => (
					<TextField
						label="Password"
						type="password"
						defaultValue={state.value}
						error={!!state.meta.errors.length}
						helperText={state.meta.errors[0]?.message}
						onChange={(e) => handleChange(e.target.value)}
						onBlur={handleBlur}
					/>
				)}
			/>
			<Button variant="contained" fullWidth onClick={() => form.handleSubmit()}>
				Login
			</Button>
		</Stack>
	);
};
