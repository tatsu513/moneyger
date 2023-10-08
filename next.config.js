const withTM = require('next-transpile-modules')(['strip-ansi']);

/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withTM(nextConfig)
