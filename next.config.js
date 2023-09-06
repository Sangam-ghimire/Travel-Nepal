/** @type {import('next').NextConfig} */ //JSDoc comment for type checking
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // allows images to be fetched from res.cloudinary domain
    }
}

module.exports = nextConfig
