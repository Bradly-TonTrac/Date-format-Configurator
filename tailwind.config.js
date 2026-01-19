/* eslint-disable global-require */
// eslint-disable-next-line import/no-import-module-exports
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
	],
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
				sans: ['Roboto', ...defaultTheme.fontFamily.sans]
			},
			fontSize: {
				'tt-xs': '12px',
				'tt-sm': '16px',
				'tt-base': '20px',
				'tt-lg': '24px',
				'tt-xl': '28px'
			},
			spacing: {
				'tt-1': '4px',
				'tt-2': '8px',
				'tt-3': '16px',
				'tt-4': '24px',
				'tt-5': '48px'
			},
			screens: {
				'tt-sm': '576px',
				'tt-md': '768px',
				'tt-lg': '992px',
				'tt-xl': '1200px'
			},
			colors: {
				// New custom palette
				primary: { DEFAULT: "#f68432", light: "#374151" },
				secondary: { DEFAULT: "#9CA3AF" },
				accent: { DEFAULT: "#D1D5DB", light: "#E5E7EB" },
				text: { DEFAULT: "#F3F4F6", secondary: "#9CA3AF", light: "#D1D5DB" },
				background: { DEFAULT: "#282828", light: "#2b2b2b" },
				border: { DEFAULT: "#5c5c5d" },

				// Keep previous TonTrac variables if still needed
				dispatch: 'var(--tontrac-dispatch-color)',
				receipt: 'var(--tontrac-receipt-color)',
				error: 'var(--tontrac-error-color)',
				success: 'var(--tontrac-success-color)',
				ring: 'var(--ring)',
				foreground: 'var(--foreground)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
					hover: 'var(--primary-accent)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--tontrac-primary-text-color)',
					foreground: 'var(--tontrac-secondary-text-color)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				input: {
					DEFAULT: 'var(--input)',
					disabled: 'var(--input-disabled)'
				},
				'list-item': {
					DEFAULT: 'var(--list-item)',
					line: 'var(--list-item-line)'
				}
			},
			borderRadius: {
				xl: '20px',
				lg: '12px',
				md: '8px',
				sm: '4px'
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 }
				}
			},
			animation: {
				fadeInUp: 'fadeInUp 1s ease-out',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/forms')({
			strategy: 'class' // only generate classes
		})
	]
}
