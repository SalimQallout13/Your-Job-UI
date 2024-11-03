import { Button } from "@/components/commons/ui/button.jsx";
import { Link } from "react-router-dom";
import { Icons } from "@/components/commons/others/icons.jsx";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 py-8 lg:flex-row">
        {/* Logo et slogan */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="text-logo-footer text-2xl font-bold lg:text-3xl">YourJob</div>
          <p className="text-sm text-gray-600">Trouvez le job de vos rêves.</p>
        </div>

        {/* Navigation Links */}
        <nav
          className="my-6 flex flex-col items-center space-y-4 font-semibold md:flex-row md:space-x-6 md:space-y-0 lg:my-0">
          <Link to="/offers" className="text-gray-600 transition hover:text-gray-900">
            Toutes les offres
          </Link>
          <Link to="/blog" className="text-gray-600 transition hover:text-gray-900">
            Blog
          </Link>
          <Link to="/recruiter" className="text-gray-600 transition hover:text-gray-900">
            Recruteur
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="font-semibold text-gray-900 transition hover:text-gray-900">
              Connexion
            </Link>
            <Button variant="gradient" className="rounded-full px-6">
              Créer mon compte
            </Button>
          </div>
        </nav>

        {/* Auth and Social */}
        <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition hover:text-gray-600"
            >
              <Icons.tiktok className="size-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition hover:text-gray-600"
            >
              <Icons.instagram className="size-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition hover:text-gray-600"
            >
              <Icons.linkedin className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
