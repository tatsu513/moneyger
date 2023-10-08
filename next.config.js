const withTM = require('next-transpile-modules')(['string-width', 'strip-ansi']);

/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withTM(nextConfig)
