import { readFileSync } from "fs"
import { POST_DIR } from "lib/files"
import path from "path"

export const getMDXSourceFromLocal = (fileName: string) => {
  const filePath = path.join(POST_DIR, fileName);
  const mdxSource = readFileSync(filePath, 'utf-8');
  return mdxSource;
}
