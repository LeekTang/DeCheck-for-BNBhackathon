/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const selectorParser = require('postcss-selector-parser');
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;
module.exports = {
  content: ['./app.vue', './src/components/*.{vue,js}', './pages/*.{vue,js}'],
  theme: {
		colors: {
			...colors,
			green: colors.emerald,
			yellow: colors.amber,
			purple: colors.violet,
			blueGray: colors.slate,
			coolGray: colors.gray,
			trueGray: colors.neutral,
			warmGray: colors.stone,
			lightBlue: colors.sky,
		},
		extend: {
			fontFamily: {
				'sans': ['PingFang', 'Helvetica', 'Arial', 'sans-serif']
			  }
		},
	},
  variants: {
		extend: {
			backgroundColor: ['dark'],
			textColor: ['dark'],
		},
	},
  plugins: [
		plugin(function ({ addVariant, prefix, e }) {
			addVariant('dark', ({ modifySelectors, separator }) => {
				modifySelectors(({ selector }) => {
					return selectorParser((selectors) => {
						selectors.walkClasses((sel) => {
							sel.value = `dark${separator}${sel.value}`;
							sel.parent.insertBefore(sel, selectorParser().astSync(prefix('.dark-mode ')));
						});
					}).processSync(selector);
				});
			});
		}),
	],
}

