import { Button } from "@/components/commons/ui/button.tsx";



import { Link } from "react-router-dom";
import { Icons } from "@/components/commons/others/icons.tsx"

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex items-center justify-between px-2 py-4 lg:py-[20px]">
        {/* Logo et slogan */}
        <div className="flex flex-col">
          <div className="text-logo-footer text-2xl font-bold lg:text-3xl">
            YourJob
          </div>
          <p className="text-sm text-gray-600">Trouvez le job de vos rêves.</p>
        </div>

        {/* Navigation Links */}
        <nav className="mr-28 hidden items-center space-x-6 font-semibold md:flex">
          <Link to="/offers" className="text-gray-600 transition hover:!text-gray-900">
            Toutes les offres
          </Link>
          <Link to="/blog" className="text-gray-600 transition hover:!text-gray-900">
            Blog
          </Link>
          <Link to="/recruiter" className="text-gray-600 transition hover:!text-gray-900">
            Recruteur
          </Link>
          {/* Auth Links */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link to="/login" className="font-semibold text-gray-900 transition hover:!text-gray-900">
              Connexion
            </Link>
            <Button
              variant="gradient"
              className="rounded-full px-6"
            >
              Créer mon compte
            </Button>
          </div>
        </nav>

        {/* Auth and Social */}
        <div className="flex items-center space-x-4">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition hover:text-gray-600"
            >
              <Icons.tiktok className="size-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition hover:!text-gray-600"
            >
              <Icons.instagram className="size-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition hover:!text-gray-600"
            >
              <Icons.linkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
