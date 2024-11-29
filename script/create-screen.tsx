const fs = require('fs');
const path = require('path');
const {camelCase} = require('lodash');

const toPascalCase = str => {
  const camelCaseStr = camelCase(str);
  return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1);
};
const toScoreCase = str => {
  return str.split('-').join('_');
};

const rawScreenName = process.argv[2];

if (!rawScreenName) {
  console.error('Please provide a screen name.');
  process.exit(1);
}
const screenName = toPascalCase(rawScreenName);
const screenNameUnderScore = toScoreCase(rawScreenName);

const screenTemplate = `import React from 'react';
import {Screen} from 'components'
import {use${screenName}} from './${rawScreenName}-container'
import {I${screenName}Props} from './types'
import t from 'locales/use-translation'

export const ${screenName} = () => {
  const {loading, navigation}: I${screenName}Props = use${screenName}()
  return (
    <Screen
      onRightPress={navigation.goBack}
      header={t('header.${screenNameUnderScore}')}></Screen>
  )
}
`;

const containerTemplate = `import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

export const use${screenName} = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const onSubmit = (): void => {
      setLoading(true);
      setLoading(false);
    };

    const values = {loading};
    const handlers = {setLoading, dispatch, onSubmit, navigation};

    return {...values, ...handlers};
   }
`;

const indexTemplate = `export * from './${rawScreenName}';`;

const typesTemplate = `export interface I${screenName}Props {
  loading: boolean
  navigation: any
  onSubmit: () => void
  setLoading: (loading: boolean) => void
}
`;

const baseDir = path.join(__dirname, '..', 'src', 'screens', rawScreenName);

// Create directories
fs.mkdirSync(baseDir, {recursive: true});

// Create files
fs.writeFileSync(path.join(baseDir, `${rawScreenName}.tsx`), screenTemplate);
fs.writeFileSync(path.join(baseDir, 'index.tsx'), indexTemplate);
fs.writeFileSync(path.join(baseDir, 'types.d.ts'), typesTemplate);
fs.writeFileSync(
  path.join(baseDir, `${rawScreenName}-container.tsx`),
  containerTemplate,
);

const toConstantCase = str => {
  return str.split('-').join('_').toUpperCase();
};

const constantScreenName = toConstantCase(rawScreenName);
console.log(`New Screen ${rawScreenName} added.`);

// Update navigation routes
const routesPath = path.join(
  __dirname,
  '..',
  'src',
  'navigation',
  'navigation-routes.tsx',
);
const newRoute = `,${constantScreenName}: '${constantScreenName}'`;
fs.readFile(routesPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Failed to read ${routesPath}:`, err);
    return;
  }

  // Insert the new route before the closing brace
  const updatedData = data.replace(/}\s*$/, `  ${newRoute}\n}`);

  fs.writeFile(routesPath, updatedData, 'utf8', err => {
    if (err) {
      console.error(`Failed to update ${routesPath}:`, err);
      return;
    }

    console.log(`Route ${constantScreenName} added to ${routesPath}.`);
  });
});
