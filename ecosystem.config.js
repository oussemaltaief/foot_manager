module.exports = {
  apps: [
    {
      name: 'etac-app',
      script: __dirname + '/app/node_modules/.bin/serve',
      cwd: __dirname + '/app',
      args: '-s -l tcp://0.0.0.0:5100 ./build',
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'etac-api',
      script: './src/index.js',
      cwd: __dirname + '/api',
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5101,
        MONGODB_URL: 'mongodb://localhost:27017/etac',
        MAILER_FROM: '"ETAC Dev" <etac@test.com>',
        SMTP_HOST: 'localhost',
        SMTP_PORT: '1027',
        SMTP_SECURE: 'false',
        SMTP_USER: 'no-auth',
        SMTP_PASS: ''
      }
    }
  ]
};
