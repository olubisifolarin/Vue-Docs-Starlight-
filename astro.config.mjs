// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';


// https://astro.build/config
export default defineConfig({
	site: 'https://olubisifolarin.github.io/Vue-Docs-Starlight-/',
  	base: 'Vue-Docs-Starlight-/',
	integrations: [
		starlight({
			customCss: ['./src/styles/custom.css'],
			title: 'Vue.js',
			favicon: '/vue.jpg',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/olubisifolarin' }], 
			sidebar: [
				{
				  label: 'Getting Started',
				  items: [
					{ label: 'Introduction', link: '/getting-started/introduction/' },
					{ label: 'Quick Start', link: '/getting-started/quick-start/' },
				  ],
				},
				{
				  label: 'Essentials',
				  autogenerate: { directory: 'essentials' },
				},
				{
				  label: 'Components In-Depth',
				  autogenerate: { directory: 'component' },
				},
				{
				  label: 'Reusability',
				  autogenerate: { directory: 'reuseable' },
				},
				{
				  label: 'Built-in Components',
				  autogenerate: { directory: 'built-in-comp' },
				},
				{
				  label: 'Scaling Up',
				  autogenerate: { directory: 'scaling-up' },
				},
				{
				  label: 'Best Practices',
				  autogenerate: { directory: 'best-practices' },
				},
				{
				  label: 'TypeScript',
				  autogenerate: { directory: 'typescripts' },
				},
				{
				  label: 'Extra Topics',
				  autogenerate: { directory: 'extra-topics' },
				},
			  ],
				
		}),
	],
});
