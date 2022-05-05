module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs',
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
  ],
};
