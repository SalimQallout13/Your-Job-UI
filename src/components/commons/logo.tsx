import { siteConfig } from "@/lib/configs/site.ts"

export const Logo = () => (
	<div className="mb-6 text-center xl:text-left">
		<img src={siteConfig.logo} alt="Logo YourJob" />
	</div>
);