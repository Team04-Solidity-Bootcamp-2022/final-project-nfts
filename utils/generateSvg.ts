import { generateFromString } from 'generate-avatar';

const generateSvg = (key: string) => {
  return generateFromString(`${key}`);
};

export default generateSvg;
