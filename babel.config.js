module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        exclude: ['transform-regenerator'],
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@dr.pogodin/react-css-modules',
      {
        autoResolveMultipleImports: true,
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        handleMissingStyleName: 'throw',
        webpackHotModuleReloading: true,
      },
    ],
  ],
};
