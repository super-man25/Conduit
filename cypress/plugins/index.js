module.exports = (on, config) => {

  if (process.env.ED_USER_PASS) {
    config.env.ED_USER_PASS = process.env.ED_USER_PASS;
  }

  return config;
};
