import feathers from '@feathersjs/client/dist/feathers';
import rest from '@feathersjs/client/dist/rest';
import auth from '@feathersjs/client/dist/authentication';

const restClient = rest(process.env.REACT_APP_API_BASE_URL);

const client = feathers()
  .configure(restClient.fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));

export default client;
