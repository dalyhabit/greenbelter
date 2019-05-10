module.exports = {
  apps: [{
    name: 'greenbelter',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-221-83-217.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/greenbelter.pem',
      ref: 'origin/master',
      repo: 'https://github.com/dalyhabit/greenbelter.git',
      path: '/home/ubuntu/greenbelter',
      'post-deploy': 'npm install && pm2 startOrRestart pm2.config.js'
    }
  }
}