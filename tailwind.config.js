/** @type {import('tailwindcss').Config} */

import animatePlugin from "tailwindcss-animate"

export default {
	content: [
		"./index.html",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	darkMode: ["class"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			screens: {
				"xs": "375px",
			},
			colors: {
				// Vos couleurs personnalisées
				'black': 'rgba(0, 0, 0, 1)',
				'black-primary': 'rgba(29, 33, 48, 1)',
				'white': 'rgba(255, 255, 255, 1)',
				'purple': 'rgba(152, 141, 254, 1)',
				'black-translucent': 'rgba(0, 0, 0, 0.75)',
				'white-translucent': 'rgba(255, 255, 255, 0.75)',
				// Couleurs existantes
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				warning: {
					DEFAULT: "hsl(var(--warning))",
					foreground: "hsl(var(--warning-foreground))",
				},
				info: {
					DEFAULT: "hsl(var(--info))",
					foreground: "hsl(var(--info-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
				},
				alert: {
					DEFAULT: "hsl(var(--alert))",
					foreground: "hsl(var(--alert-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			fontSize: {
				'h1': '70px',
				'h2': '66px',
				// Vous pouvez ajouter d'autres tailles personnalisées si nécessaire
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fadeIn": {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				"fadeOut": {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fadeIn": 'fadeIn 0.6s ease-out',
				"fadeOut": 'fadeOut 0.6s ease-out',
			},
		},
	},
	plugins: [animatePlugin],
}
