module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production"
      ? require("cssnano")({
          preset: "default"
        })
      : null,
    process.env.NODE_ENV === "production"
      ? require("@fullhuman/postcss-purgecss")({
          content: ["./src/**/*.jsx", "./src/**/*.css", "./public/index.html"],
          defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        })
      : null
  ]
};
