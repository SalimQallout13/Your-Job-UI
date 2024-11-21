import React from "react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form.tsx"
import { Link } from "react-router-dom"
import { useLoginForm } from "@/lib/hooks/auth/use-login-form.ts"
import { Message } from "@/components/ui/alert.tsx"
import { SignUpLink } from "@/components/commons/signUp-link.tsx"
import { SignUpHeader } from "@/components/commons/sign-up-header.tsx"
import { Logo } from "@/components/commons/logo.tsx"

interface LoginFormProps {
	closeDialog: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ closeDialog }) => {

	const { loginFormSchema, isSubmitting, errorMessage, submitLoginForm } = useLoginForm()

	return (
		<>
			<Logo />
			<SignUpHeader title={"Ravi de vous revoir !"}
										description={"Entrez vos informations de connexion pour accéder à la plateforme."} />
			<div className="mt-3 space-y-7">
				<Form {...loginFormSchema}>
					<form onSubmit={loginFormSchema.handleSubmit(submitLoginForm)} className="space-y-7">
						{errorMessage && <Message message={errorMessage} type={"alert"} />}
						<FormField
							control={loginFormSchema.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse mail</FormLabel>
									<FormControl>
										<Input autoComplete="email" placeholder="john.doe@gmail.com" {...field}
													 className="bg-white text-black" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={loginFormSchema.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mot de passe</FormLabel>
									<FormControl>
										<Input autoComplete="current-password" type="password" {...field}
													 className="bg-white text-black" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center justify-between">
							<Link to={"/"} className="text-sm underline">
								Mot de passe oublié ?
							</Link>
						</div>
						<div className="mb-10 flex items-center justify-end gap-4">
							<Button type="button" variant="outline" onClick={closeDialog}>
								Annuler
							</Button>
							<FormControl>
								<Button variant="gradient" disabled={isSubmitting}>
									{isSubmitting ? "Connexion en cours..." : "Connexion"}
								</Button>
							</FormControl>
						</div>
						<SignUpLink />
					</form>
				</Form>
			</div>
		</>
	)
}
