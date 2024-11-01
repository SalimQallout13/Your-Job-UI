import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "@/components/pages/dashboard/home-page/home-page.tsx";
import { ROUTES } from "@/lib/configs/routes.ts";
import SpinnerPageLoad from "@/components/commons/others/spinner-page-load.tsx";
import Navbar from "@/components/commons/others/navbar.tsx";
import Sidebar from "@/components/commons/others/sidebar.tsx";
import { useDashboard } from "@/lib/hooks/use-dashboard.ts"; // Nouveau hook pour l'authentification
import { useState } from "react";

export function Dashboard() {
	const { isLoading } = useDashboard();
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	// todo: mettre à jour quand la connexion sera faite
	// For disconnection, when having a logout error
	// useAuth();

	const renderRoutes = () => (
		<Routes>
			<Route path={ROUTES.HOME_PATH} element={<HomePage />} />
		</Routes>
	);

	return (
		<div className="relative flex min-h-screen w-full flex-col bg-muted/40 pb-10">
			<Sidebar isOpen={sidebarIsOpen} setIsOpen={() => setSidebarIsOpen(!sidebarIsOpen)} />
			<div className={"flex flex-col transition-all duration-300 ease-in-out " + (sidebarIsOpen ? 'lg:ml-[230px]' : 'lg:ml-[85px]')}>
				<Navbar />
				<main>
					<div className="mt-3 px-3 sm:px-3">
						{isLoading ? <SpinnerPageLoad /> : <><Outlet />{renderRoutes()}</>}
					</div>
				</main>
			</div>
		</div>
	);
}
