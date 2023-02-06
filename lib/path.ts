export const isSameFirstPath = (pathA: string, pathB: string) => {
  const aFirstPath = pathA.split('/')[1]
  const bFirstPath = pathB.split('/')[1]

  /* ✅ Fix: Ios regex issue  */
  // const subPathRegex = /(?<=[^\/])\/[^\/]*/g
  // const aFirstPath = pathA.replace(subPathRegex, '')
  // const bFirstPath = pathB.replace(subPathRegex, '')
  return aFirstPath === bFirstPath
}
