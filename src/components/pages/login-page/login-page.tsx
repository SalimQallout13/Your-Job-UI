import { LoginForm } from "@/components/pages/login-page/login-form.tsx"
import { siteConfig } from "@/lib/configs/site.ts"
import { useEffect } from "react"
import frame from "@/assets/img/Frame_39.png"

const LoginPage = () => {

	useEffect(() => {
		deactivateScroll()
	}, [])

	const deactivateScroll = () => {
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = "auto"
		}
	}

	const styleMsg = {
		fontFamily: "Inter",
		fontSize: "36px",
		fontWeight: 700,
		lineHeight: "43.57px",
		letterSpacing: "-0.06em"
	}

	const styleDesc = {
		fontFamily: "Inter",
		fontSize: "16px",
		fontWeight: 500,
		lineHeight: "19.36px",
		letterSpacing: "-6%"
	}

	return (
		<div>
			{/* Main content container */}
			<div className="flex h-screen">
				<div className="flex w-full flex-col items-center justify-center ps-52 xl:w-1/2">
					<div className="mb-10 flex w-full flex-col items-start ps-32">
						<div className="mb-10 text-4xl font-bold">
							<img
								src={siteConfig.logo}
								alt="Logo YourJob"
							/>
						</div>
						<div className="mb-10" style={styleMsg}>
							{siteConfig.description}
						</div>
						<p style={styleDesc}>Entrez vos informations de connexion pour accéder à la plateforme.</p>
					</div>
					<div className="mx-auto w-full max-w-[500px]">
						<LoginForm />
					</div>
				</div>

				<div className="hidden w-1/2 flex-col items-end justify-center xl:flex">
					<img src={frame} alt="Frame" />
				</div>
			</div>
		</div>
	)
}

export default LoginPage
