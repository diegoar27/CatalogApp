let configStore = () => {};

// eslint-disable-next-line global-require
configStore = require('./dev-store').default;

export default function configureStore(initialState) {
  return configStore(initialState);
}
