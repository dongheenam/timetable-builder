import autoprefixer from "autoprefixer";
import nested from "postcss-nested";

const config = {
  syntax: "postcss",
  plugins: [nested(), autoprefixer()],
};
export default config;
