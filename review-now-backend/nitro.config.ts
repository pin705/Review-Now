import { defineConfig } from "nitro"

export default defineConfig({
  serverDir: './',
  devServer: {
    port: 3005
  },
  runtimeConfig: {
    r2AccountId: process.env.R2_ACCOUNT_ID || 'c8dc00dc091a2fc3f23f67b80ecada48',
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || '0e77e848422d50c9805ea64619ce2c91',
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '37999e7aa416a0be5b8219cf3e74edc3d74ccdf966a3019bf543621b3b075e61',
    r2BucketName: process.env.R2_BUCKET_NAME || 'loreweaver-covers',
    r2PublicUrl: process.env.R2_PUBLIC_URL || 'https://pub-ace38ee6a46144ba96aaa5f8132d76c7.r2.dev',
  },
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  }
});
