// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://olubisifolarin.github.io/Vue-Docs-Starlight-/',
  	base: '/Vue-Docs-Starlight-/',
	integrations: [
		starlight({
			title: 'Vue.js',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }], 
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
			  ],
				
		}),
	],
});
