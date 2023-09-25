module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    config.resolve.fallback = { fs: false }

    return config
  },
  images: { domains: ['firebasestorage.googleapis.com'] },
  // reactStrictMode: false,
  // webpack5: true,
  optimizeFonts: false,
  env: {
    MONGO_URI:
      'mongodb+srv://valmalinta:valmalinta@cluster0.uhtrmjw.mongodb.net/?retryWrites=true&w=majority',
  },
}
