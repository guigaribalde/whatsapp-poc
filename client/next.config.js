/** @type {import('next').NextConfig} */
//webpack.functions.js
const nodeExternals = require('webpack-node-externals');

const nextConfig = {
  externals: [nodeExternals()],
}

module.exports = nextConfig
