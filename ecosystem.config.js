module.exports = {
  apps: [
    {
      name: 'ZNGG',
      exec_mode: 'cluster',
      instances: '2',
      script: './.output/server/index.mjs'
    }
  ]
}