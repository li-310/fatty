import { isVue2 } from "vue-demi";
import { switchVersion } from "./utils.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

try {
  fs.writeFileSync(
    path.join(__dirname, "postinstall.log"),
    JSON.stringify(
      {
        isVue2,
        cwd: process.cwd(),
      },
      null,
      4
    )
  );
  switchVersion(isVue2 ? 2 : 3);
} catch (err) {
  console.log(err);
}
