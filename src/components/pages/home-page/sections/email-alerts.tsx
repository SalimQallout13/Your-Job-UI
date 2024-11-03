import { Button } from "@/components/commons/ui/button.tsx"
import { Icons } from "@/components/commons/others/icons"

const EmailAlerts = () => {
  return (
    <div className="bg-[#18182E] py-24">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="bg-purple inline-flex items-center space-x-2 rounded-full px-6 py-3 text-white">
            <Icons.newsletter className="size-5" />
            <span className="text-sm">Restez au courant</span>
          </div>
        </div>

        {/* Titre */}
        <h2 className="mb-6 text-5xl font-bold text-white">
          Reçois tes Alertes <span className="text-purple-highlight">Par Mail</span>
        </h2>

        {/* Description */}
        <p className="mb-12 text-gray-400">
          Ne manquez aucune offre d'emploi.
        </p>

        {/* Formulaire d'inscription */}
        <div className="mx-auto flex max-w-2xl items-center rounded-full bg-white p-1">
          <div className="ml-4 size-8 rounded-full bg-gray-100">
            {/* Placeholder pour l'icône de profil */}
          </div>
          <input 
            type="email" 
            placeholder="Votre mail" 
            className="flex-1 bg-transparent px-4 outline-none placeholder:text-gray-400" 
          />
          <Button
            variant="gradient2"
            className="rounded-full px-8 py-6 text-white transition-all hover:opacity-90"
          >
            Rester au courant
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmailAlerts