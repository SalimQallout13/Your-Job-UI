import { Button } from "@/components/commons/ui/button.jsx";
import { Icons } from "@/components/commons/others/icons.jsx";

const EmailAlerts = () => {
  return (
    <div className="bg-black-primary px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="bg-purple inline-flex items-center space-x-2 rounded-full px-6 py-3 text-white">
            <Icons.newsletter className="size-5" />
            <span className="text-sm">Restez au courant</span>
          </div>
        </div>

        {/* Titre */}
        <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
          Recevez vos Alertes <span className="text-purple-highlight">Par Mail</span>
        </h2>

        {/* Description */}
        <p className="mb-12 text-gray-400">Ne manquez aucune offre d'emploi.</p>

        {/* Formulaire d'inscription */}
        <div className="mx-auto flex max-w-xl items-center rounded-full bg-white p-1">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 bg-transparent px-4 py-2 outline-none placeholder:text-gray-400"
          />
          <Button
            variant="gradient2"
            className="rounded-full px-8 py-4 text-white transition-all hover:opacity-90 sm:mt-0"
          >
            Rester au courant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailAlerts;
