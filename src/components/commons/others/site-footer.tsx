import {Icons} from "@/components/commons/others/icons.tsx"
import {LoginNav} from "@/components/commons/others/login-nav.tsx"
import {buttonVariants} from "@/components/commons/ui/button.tsx"
import {siteConfig} from "@/lib/configs/site.ts"
import {Link} from "react-router-dom"

export function LoginFooter() {
    return (
        <footer className="sticky z-40 w-full bg-background shadow-[0_0_10px_-3px_rgba(0,0,0,0.1)]">
            <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0 sm:px-7">
                <LoginNav/>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <Link to={siteConfig.links.website} target="_blank" rel="noreferrer">
                            <div
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.linkedin className="size-5" color={"#042535"}/>
                                <span className="sr-only">Site web</span>
                            </div>
                        </Link>
                        <Link
                            to={siteConfig.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "icon",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.linkedin color={"#0e76a8"} className="size-5"/>
                                <span className="sr-only">Linkedin</span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
