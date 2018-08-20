const config = {
  hostname: '127.0.0.1',
  db: {
    port: 27017,
    name: 'crossfit',
  },
  app: {
    port: 3000,
  },
};


config.db.url = `mongodb://${config.hostname}:${config.db.port}/${config.db.name}`;

Object.freeze(config);

module.exports = config;