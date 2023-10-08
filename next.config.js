const withTM = require('next-transpile-modules')(['string-width', 'strip-ansi', 'build']);

/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withTM(nextConfig)
