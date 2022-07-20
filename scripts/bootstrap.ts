import { resolve } from 'path';
import { ESLint } from 'eslint';
import fs from 'fs';
import prettier from 'prettier';
import { logger, allComponents, toCapitalCase } from './utils';

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});

async function main() {
  const plugins: string[] = [];
  const ignores: string[] = [];
  const exportComponents = allComponents.filter((item) => !ignores.includes(item));
  const components = exportComponents.filter((item) => !plugins.includes(item));
  const prettierConfig = await prettier.resolveConfig(resolve('.pretterrc.js'));
  const index = `
    ${exportComponents
      .map((component) => `import { Db${toCapitalCase(component)} } from './${component}/index'`)
      .join('\n')}

    import { buildInstall } from './create'

    export { version } from './version'

    const components = [
      ${components
        .map(toCapitalCase)
        .map((name) => `Db${name}`)
        .join(',\n')},
      // plugins
      ${plugins
        .map(toCapitalCase)
        .map((name) => `Db${name}`)
        .join(', ')}
    ]

    export { buildInstall }
    export const install = buildInstall(components)

    export {
     ${exportComponents
       .map(toCapitalCase)
       .map((name) => `Db${name}`)
       .join(',\n')}
    }
  `;

  const types = `
    declare module 'vue' {
      export interface GlobalComponents {
        ${components
          .map(
            (name) =>
              `${toCapitalCase(name)}: typeof import('db-plus')['Db${toCapitalCase(name)}']`,
          )
          .join(',\n')}
      }

      interface ComponentCustomProperties {
        ${plugins
          .map((name) => `$${name}: typeof import('db-plus')['Db${toCapitalCase(name)}']`)
          .join(',\n')}
      }
    }

    export {}
  `;

  const eslint = new ESLint({ fix: true });
  const indexPath = resolve(__dirname, '../packages/components/index.ts');
  const typesPath = resolve(__dirname, '../types.d.ts');

  fs.writeFileSync(
    indexPath,
    prettier.format(index, { ...prettierConfig, parser: 'typescript' }),
    'utf-8',
  );

  fs.writeFileSync(
    typesPath,
    prettier.format(types, { ...prettierConfig, parser: 'typescript' }),
    'utf-8',
  );

  await ESLint.outputFixes(await eslint.lintFiles(indexPath));
  await ESLint.outputFixes(await eslint.lintFiles(typesPath));

  exportComponents
    .filter(
      (component) =>
        !fs.existsSync(resolve(__dirname, `../packages/theme-chalk/src/${component}.scss`)),
    )
    .forEach((component) =>
      fs.writeFileSync(
        resolve(__dirname, `../packages/theme-chalk/src/${component}.scss`),
        '',
        'utf-8',
      ),
    );

  const styleIndex =
    "@use './common/index.scss';\n\n" +
    exportComponents.map((component) => `@use './${component}.scss';`).join('\n') +
    '\n';
  const stylePath = resolve(__dirname, '../packages/theme-chalk/src/index.scss');

  fs.writeFileSync(
    stylePath,
    prettier.format(styleIndex, { ...prettierConfig, parser: 'scss' }),
    'utf-8',
  );
}
