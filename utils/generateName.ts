import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names,
} from 'unique-names-generator';

const generateName = (key: string) => {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: ' ',
    style: 'capital',
    seed: `${key}`,
  });
};

const generateUserName = (key: string) => {
  return uniqueNamesGenerator({
    dictionaries: [names],
    separator: '_',
    style: 'capital',
    seed: `${key}`,
  });
};

export { generateName, generateUserName };
