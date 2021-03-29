const path = require(`path`);
const babel = require(`@babel/core`);
const os = require(`os`);

if (!process.env.BABEL_CACHE_PATH)
  process.env.BABEL_CACHE_PATH = path.join(
    os.tmpdir(),
    `babel`,
    `.babel.${babel.version}.${babel.getEnv()}.json`
  );

const babelRegister = require(`@babel/register`);

babelRegister({
  rootMode: "upward",
  extensions: [`.tsx`, `.ts`],
  only: [() => `/`],
});
