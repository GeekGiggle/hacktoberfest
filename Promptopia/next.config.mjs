/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{

        appDir:true,
        serverComponentsExternalPackages:["mongoose"],
        missingSuspenseWithCSRBailout: false, // Disable the Suspense requirement

    },
    images : {
        domains:['lh3.googleusercontent.com'],
    },

    webpack(config){
        config.experiments = {
            ...config.experiments,
            topLevelAwait : true,
        }

        return config
    }
};

export default nextConfig;
