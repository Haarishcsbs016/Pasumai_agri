
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				tamil: ['Hind Madurai', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#e8f5e9',
					100: '#c8e6c9',
					200: '#a5d6a7',
					300: '#81c784',
					400: '#66bb6a',
					500: '#4caf50',
					600: '#43a047',
					700: '#388e3c',
					800: '#2e7d32',
					900: '#1b5e20',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#e1f5fe',
					100: '#b3e5fc',
					200: '#81d4fa',
					300: '#4fc3f7',
					400: '#29b6f6',
					500: '#03a9f4',
					600: '#039be5',
					700: '#0288d1',
					800: '#0277bd',
					900: '#01579b',
				},
				earth: {
					50: '#efebe9',
					100: '#d7ccc8',
					200: '#bcaaa4',
					300: '#a1887f',
					400: '#8d6e63',
					500: '#795548',
					600: '#6d4c41',
					700: '#5d4037',
					800: '#4e342e',
					900: '#3e2723',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backgroundImage: {
				'farm-pattern': "url('/farm-pattern.png')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
