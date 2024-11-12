import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { LoginForm } from "@/components/pages/login-page/login-form"
import { siteConfig } from "@/lib/configs/site"
import Paragraph from "@/components/ui/paragraph"
import frame from "@/assets/img/Frame_39.png"
import React from "react"

type LoginPageProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ isOpen, setIsOpen }) => {
	const styleMsg = {
		fontFamily: "Inter",
		fontSize: "36px",
		fontWeight: 700,
		lineHeight: "43.57px",
		letterSpacing: "-0.06em"
	}

	// Fonction pour fermer le modal
	const closeDialog = () => setIsOpen(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="h-screen min-w-full">
				<DialogHeader>
					<DialogTitle className="hidden" />
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="mx-auto">
					<div className="flex flex-wrap items-center">
						<div className="w-full md:w-1/2">
							<div className="text-purple-700 mb-10 text-4xl font-bold">
								<img src={siteConfig.logo} alt="Logo YourJob" />
							</div>
							<div className="mb-10" style={styleMsg}>
								{siteConfig.description}
							</div>
							<Paragraph className="mb-6">
								Entrez vos informations de connexion pour accéder à la plateforme.
							</Paragraph>
							<div className="mx-auto w-full">
								<LoginForm closeDialog={closeDialog} />
							</div>
						</div>
						<div className="hidden w-full md:w-1/2 xl:flex">
							<img className="ms-56" style={{ marginTop: "-63px" }} src={frame} alt="Frame" />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default LoginPage
