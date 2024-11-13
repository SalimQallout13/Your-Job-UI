import {
  LucideProps,
  Moon,
  SunMedium,
  type LucideIcon,
} from "lucide-react"

import SignupCandidatIcon from "@/assets/icons/signup-candidat-icon.png"
import SignupEmployeurIcon from "@/assets/icons/signup-employeur-icon.png"
import SignupSelectCardIcon from "@/assets/icons/signup-select-card-icon.png"

export type Icon = LucideIcon

import DesignIcon from "@/assets/icons/design-icon.png";
import DevelopIcon from "@/assets/icons/develop-icon.png";
import DreamIcon from "@/assets/icons/dream-icon.png";
import FinanceIcon from "@/assets/icons/finance-icon.png";
import GestionIcon from "@/assets/icons/gestion-icon.png";
import InstaIcon from "@/assets/icons/insta-icon.png";
import LinkedinIcon from "@/assets/icons/linkedin-icon.png";
import LocalisationIcon from "@/assets/icons/localisation-icon.png";
import NewsletterIcon from "@/assets/icons/newsletter-icon.png";
import NoticeIcon from "@/assets/icons/notice-icon.png";
import RhIcon from "@/assets/icons/rh-icon.png";
import SearchIcon from "@/assets/icons/search-icon.png";
import ServiceClientIcon from "@/assets/icons/service-client-icon.png";
import TikTokIcon from "@/assets/icons/tiktok-icon.png";
import TriIcon from "@/assets/icons/tri-icon.png";
import VenteIcon from "@/assets/icons/vente-icon.png";
import MarketIcon from "@/assets/icons/market-icon.png";
import { HTMLAttributes } from "react";


export const Icons = {
  sun: SunMedium,
  moon: Moon,
  design: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={DesignIcon} alt="Design icon" className={className} {...props} />
  ),
  develop: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={DevelopIcon} alt="Development icon" className={className} {...props} />
  ),
  dream: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={DreamIcon} alt="Dream icon" className={className} {...props} />
  ),
  finance: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={FinanceIcon} alt="Finance icon" className={className} {...props} />
  ),
  gestion: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={GestionIcon} alt="Gestion icon" className={className} {...props} />
  ),
  instagram: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={InstaIcon} alt="Instagram icon" className={className} {...props} />
  ),
  linkedin: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={LinkedinIcon} alt="LinkedIn icon" className={className} {...props} />
  ),
  localisation: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={LocalisationIcon} alt="Localisation icon" className={className} {...props} />
  ),
  newsletter: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={NewsletterIcon} alt="Newsletter icon" className={className} {...props} />
  ),
  notice: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={NoticeIcon} alt="Notice icon" className={className} {...props} />
  ),
  rh: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={RhIcon} alt="RH icon" className={className} {...props} />
  ),
  search: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={SearchIcon} alt="Search icon" className={className} {...props} />
  ),
  serviceClient: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={ServiceClientIcon} alt="Service client icon" className={className} {...props} />
  ),

  tiktok: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={TikTokIcon} alt="TikTok icon" className={className} {...props} />
  ),
  tri: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={TriIcon} alt="Tri icon" className={className} {...props} />
  ),
  vente: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={VenteIcon} alt="Vente icon" className={className} {...props} />
  ),
  market: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={MarketIcon} alt="Market icon" className={className} {...props} />
  ),
  signupCandidat: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={SignupCandidatIcon} alt="Signup Candidat icon" className={className} {...props} />
  ),
  signupEmployeur: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={SignupEmployeurIcon} alt="Signup Employeur icon" className={className} {...props} />
  ),
  signupSelectCard: ({ className, ...props }: HTMLAttributes<HTMLImageElement>) => (
    <img src={SignupSelectCardIcon} alt="Signup Select Card icon" className={className} {...props} />
  ),
  warning: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
         aria-hidden="true" role="img" viewBox="0 0 24 24" {...props}
    >
        <path fill="currentColor" fillRule="evenodd"
              d="M7.843 3.802C9.872 2.601 10.886 2 12 2c1.114 0 2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594c-.557.99-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22c-1.114 0-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7c.557-.99 1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75"
              clipRule="evenodd"></path>
    </svg>
  )

}
