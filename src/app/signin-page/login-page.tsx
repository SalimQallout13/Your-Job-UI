import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { LoginForm } from "@/app/signin-page/login-form"
import frame from "@/assets/img/Frame_39.png"
import React from "react"

type LoginPageProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ isOpen, setIsOpen }) => {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="h-screen min-w-full p-0">
				<DialogHeader>
					<DialogTitle className="hidden" />
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="flex min-h-screen overflow-hidden xl:flex-row">
					<div className="flex w-full flex-col justify-center overflow-auto bg-white p-8 xl:w-1/2 xl:pb-16 xl:pe-16 xl:ps-56 xl:pt-12">
						<LoginForm />
					</div>
					<div className="relative bottom-10 left-56 hidden xl:block xl:w-1/2">
						<div className="fixed h-screen w-1/2">
							<img className="object-cover" src={frame} alt="Frame" />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default LoginPage
