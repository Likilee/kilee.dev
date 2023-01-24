export const isSameFirstPath = (pathA: string, pathB: string) => {
  const subPathRegex = /(?<=[^\/])\/[^\/]*/g;
  const aFirstPath = pathA.replace(subPathRegex, '');
  const bFirstPath = pathB.replace(subPathRegex, '');

  return aFirstPath === bFirstPath;
}