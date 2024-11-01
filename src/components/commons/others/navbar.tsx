import {useState} from "react";
import {Search} from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbSeparator, useBreadcrumbs
} from "@/components/commons/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/commons/ui/dropdown-menu.tsx";
import placeholder from "@/assets/img/placeholder-avatar.webp";
import {useLogout} from "@/lib/hooks/auth/use-logout.tsx";
import {SheetMenu} from "@/components/commons/others/sheet-menu.tsx";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {CommandDialogSearch} from "@/components/commons/others/command-dialog-search.tsx";

const Navbar = () => {
    const {handleLogout} = useLogout();
    const breadcrumbs = useBreadcrumbs();

    // Gérer l'état d'ouverture pour CommandDialogDemo
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    const renderBreadcrumbs = () => (
        <Breadcrumb className="hidden lg:flex">
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <BreadcrumbItem key={breadcrumb.path + index}>
                        <BreadcrumbLink asChild>
                            <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                        </BreadcrumbLink>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator/>}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );

    const renderSearchInput = () => (
        <div className="relative ml-4 w-fit cursor-pointer">
            <div onClick={() => setIsCommandOpen(true)}>
                <Search className="absolute left-[11px] top-3 size-4 cursor-pointer text-muted-foreground"/>
                <Input
                    type="search"
                    className="w-10 cursor-pointer rounded-lg bg-background"
                />
            </div>

            <CommandDialogSearch isOpen={isCommandOpen} onOpenChange={setIsCommandOpen}/>
        </div>
    );

    const renderUserMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="max-h-8 max-w-8 overflow-hidden rounded-full sm:max-h-none sm:max-w-none"
                >
                    <img
                        src={placeholder}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleLogout} className="font-bold text-destructive">
                    Déconnexion
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <nav
            className="sticky top-0 z-40 flex animate-fadeIn items-center justify-between border-b bg-background p-4 lg:static lg:z-30 lg:h-auto lg:border-0 lg:bg-transparent lg:px-6">
            <div className="flex items-center gap-4">
                <SheetMenu/>
                {renderBreadcrumbs()}
            </div>
            <div className="flex items-center gap-4">
                {renderSearchInput()}
                {renderUserMenu()}
            </div>
        </nav>
    );
};

export default Navbar;
