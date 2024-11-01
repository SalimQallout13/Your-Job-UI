import { Link } from "react-router-dom"
import logo from "@/assets/img/logo-hexacoffre-without-text.webp"
import { ROUTES } from "@/lib/configs/routes.ts"

export function LoginNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to={ROUTES.LOGIN} className="flex items-center space-x-3">
        <img src={logo} alt={"Logo Hexacoffre"} className="size-8 bg-transparent/0" />
      </Link>
    </div>
  )
}