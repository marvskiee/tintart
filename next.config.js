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
      'mongodb+srv://tintartadmin:tintartadmin@cluster0.5kcud6w.mongodb.net/?retryWrites=true&w=majority',
  },
}
