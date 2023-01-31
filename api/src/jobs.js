const Agenda = require('agenda');
const sendSubscriber = require('./jobs/send-subscriber-to-handshake');
const blockSubscriber = require('./jobs/block-subscriber-from-handshake');
const sendTicketToHandshake = require('./jobs/send-ticket-to-handshake');
const sendPropertyToHandshake = require('./jobs/send-property-to-handshake');
const sendStationToHandshake = require('./jobs/send-stations-to-handshake');
const sendPersonCategoryToHandshake = require('./jobs/send-personCat-to-handshake');

const SEND_SUBCRIBER = 'send subscriber';
const SEND_TICKET_TO_HANDSHAKE = 'send ticket to handshake';
const BLOCK_SUBCRIBER = 'block subscriber';
const SEND_PROPERTY = 'send new tsproperty (ticket type)to hsh';
const SEND_NewStation = 'send new tsproperty (station)  to hsh';
const SEND_NewCategory = 'send new tsproperty (persona category) to hsh';
module.exports = async function(app) {
  const agenda = new Agenda({ db: { address: app.get('mongodb') } });
  agenda.define(
    SEND_NewCategory,
    { concurrency: 10, lockLifetime: 10000 },
    sendPersonCategoryToHandshake.bind(app)
  );
  agenda.define(
    SEND_SUBCRIBER,
    { concurrency: 10, lockLifetime: 10000 },
    sendSubscriber.bind(app)
  );
  agenda.define(
    BLOCK_SUBCRIBER,
    { concurrency: 10, lockLifetime: 10000 },
    blockSubscriber.bind(app)
  );
  agenda.define(
    SEND_TICKET_TO_HANDSHAKE,
    { concurrency: 10, lockLifetime: 10000 },
    sendTicketToHandshake.bind(app)
  );
  agenda.define(
    SEND_PROPERTY,
    { concurrency: 10, lockLifetime: 10000 },
    sendPropertyToHandshake.bind(app)
  );
  agenda.define(
    SEND_NewStation,
    { concurrency: 10, lockLifetime: 10000 },
    sendStationToHandshake.bind(app)
  );
  await agenda.start();

  app.set('jobs', {
    sendSubscriber: {
      insert: id =>
        agenda.now(SEND_SUBCRIBER, {
          id: id.toString(),
          action: 'I'
        }),
      update: id =>
        agenda.now(SEND_SUBCRIBER, {
          id: id.toString(),
          action: 'U'
        }),
      retry: data => agenda.schedule('in 5 minutes', SEND_SUBCRIBER, data)
    },
    sendProperty: {
      insert: id =>
        agenda.now(SEND_PROPERTY, {
          id: id.toString(),
          action: 'I'
        }),
      update: id =>
        agenda.now(SEND_PROPERTY, {
          id: id.toString(),
          action: 'U'
        }),
      delete: id =>
        agenda.now(SEND_PROPERTY, {
          id: id.toString(),
          action: 'D'
        }),
      retry: data => agenda.schedule('in 5 minutes', SEND_PROPERTY, data)
    },
    sendStation: {
      insert: id =>
        agenda.now(SEND_NewStation, {
          id: id.toString(),
          action: 'I'
        }),
      delete: id =>
        agenda.now(SEND_NewStation, {
          id: id.toString(),
          action: 'D'
        }),
      update: id =>
        agenda.now(SEND_NewStation, {
          id: id.toString(),
          action: 'U'
        }),
      retry: data => agenda.schedule('in 5 minutes', SEND_NewStation, data)
    },
    blockSubscriber: {
      insert: id =>
        agenda.now(BLOCK_SUBCRIBER, {
          id: id.toString(),
          action: 'I'
        }),
      update: id =>
        agenda.now(BLOCK_SUBCRIBER, {
          id: id.toString(),
          action: 'U'
        }),
      retry: data => agenda.schedule('in 5 minutes', BLOCK_SUBCRIBER, data)
    },
    sendTicket: {
      insert: id =>
        agenda.now(SEND_TICKET_TO_HANDSHAKE, {
          id: id.toString(),
          action: 'I'
        }),
      update: id =>
        agenda.now(SEND_TICKET_TO_HANDSHAKE, {
          id: id.toString(),
          action: 'U'
        }),
      retry: data =>
        agenda.schedule('in 5 minutes', SEND_TICKET_TO_HANDSHAKE, data)
    },
    sendCategory: {
      insert: id =>
        agenda.now(SEND_NewCategory, {
          id: id.toString(),
          action: 'I'
        }),
      update: id =>
        agenda.now(SEND_NewCategory, {
          id: id.toString(),
          action: 'U'
        }),
      delete: id =>
        agenda.now(SEND_NewCategory, {
          id: id.toString(),
          action: 'D'
        }),
      retry: data => agenda.schedule('in 5 minutes', SEND_NewCategory, data)
    }
  });
};
