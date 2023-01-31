const setupDate = require('./set-up-date');

function getBlockedSubscriber(action, subscriber) {
  return `<TSData>
      <Header>
        <Version>HSHIF25</Version>
        <Issuer>15</Issuer>
        <Receiver>1</Receiver>
        <ID>0</ID>
      </Header>
      <BlacklistRecord Expire="${setupDate.formatDate(
    subscriber.subscription.validTo
  )}">
      <Action>${action}</Action>
      <WhitelistRecord Expire="${setupDate.formatDate(
    subscriber.subscription.validTo
  )}">
        <UTID>${subscriber._id}</UTID>
        <Coding>262</Coding>
        <Permission>
        <UPID>1</UPID>
       </Permission>
      </WhitelistRecord>
      <BlockingType>1</BlockingType>
      <BlockingReason>3</BlockingReason>
      <DisplayMessage>Subscription is not accepted</DisplayMessage>
      </BlacklistRecord>
      </TSData>`;
}
function getActiveSubscriber(action, subscriber, product) {
  return `<TSData>
      <Header>
        <Version>HSHIF25</Version>
        <Issuer>15</Issuer>
        <Receiver>1</Receiver>
        <ID>0</ID>
      </Header>
      <WhitelistRecord Expire="${setupDate.formatDate(
    subscriber.subscription.validTo
  )}">
        <Action>${action}</Action>
        <UTID>${subscriber._id}</UTID>
        <Coding>262</Coding>
        <Permission>
        <UPID>1</UPID>
        <TSProperty Type="TICKETTYPE">
        <ID>${product._id}</ID>
        </TSProperty>
        <TSProperty Type="VALIDITY" 
        From="${setupDate.formatDate(
    subscriber.subscription.validFrom
  )}" To="${setupDate.formatDate(subscriber.subscription.validTo)}"/>
  <TSProperty Type="FIRSTNAME">
  <ID>${subscriber.infos.firstName}</ID>
  </TSProperty>
  <TSProperty Type="LASTNAME">
  <ID>${subscriber.infos.lastName}</ID>
  </TSProperty>
  </Permission>
      </WhitelistRecord>
      </TSData>`;
}

function getRecords(action, product, trip, tickets, personcategory, validFrom) {
  let records = '';

  for (let i = 0; i < tickets.length; i++) {
    records += `<WhitelistRecord Expire="${setupDate.formatExpire(
      tickets[i].validUntil
    )}">
        <Action>${action}</Action>
        <UTID>${tickets[i].serialNumber}</UTID>          
        <Coding>262</Coding>
        <Permission>
        <UPID>1</UPID>
        <TSProperty Type="TICKETTYPE">
        <ID>${product._id}</ID>
        </TSProperty>  
        <TSProperty Type="VALIDITY" From="${setupDate.formatDate(
    validFrom
  )}" To="${setupDate.formatDate(tickets[i].validUntil)}">
        </TSProperty>     
        <TSProperty Type="POINTS">
        <ID>${product.units}</ID>
        </TSProperty>
        <TSProperty Type="PERSONCATEGORY">
        <ID>${personcategory}</ID>
        </TSProperty>
        <TSProperty Type="STARTSTATION">
        <ID>${trip.startStation}</ID>
        </TSProperty>
        <TSProperty Type="ENDSTATION">
        <ID>${trip.endStation}</ID>
        </TSProperty> 
        </Permission>
      </WhitelistRecord>`;
  }
  return records;
}
function getOrderEnvelope(wlRecords) {
  var header = `<TSData>
    <Header>
      <Version>HSHIF25</Version>
      <Issuer>15</Issuer>
      <Receiver>1</Receiver>
      <ID>0</ID>
    </Header> `;
  return header + wlRecords + '</TSData>';
}

function getPersonCategoryEnvelope(action, category) {
  return `<TSData>
  <Header>
    <Version>HSHIF25</Version>
    <Issuer>15</Issuer>
    <Receiver>1</Receiver>
    <ID>0</ID>
  </Header>
  <TSProperty  Type="PERSONCATEGORY">
  <Action>${action}</Action>
  <ID>${category._id}</ID>
  <Name>${category.name}</Name>
  </TSProperty>
  </TSData>`;
}

function getStationEnvelope(action, station) {
  return `<TSData>
  <Header>
    <Version>HSHIF25</Version>
    <Issuer>15</Issuer>
    <Receiver>1</Receiver>
    <ID>0</ID>
  </Header>
  <TSProperty Type="STARTSTATION">
  <Action>${action}</Action>
  <ID>${station._id}</ID>
  <Name>${station.name}</Name>
  </TSProperty>
  <TSProperty Type="ENDSTATION">
  <Action>I</Action>
  <ID>${station._id}</ID>
  <Name>${station.name}</Name>
  </TSProperty>
  </TSData>`;
}

function getNewProductEnvelope(action, product) {
  return `<TSData>
  <Header>
    <Version>HSHIF25</Version>
    <Issuer>15</Issuer>
    <Receiver>1</Receiver>
    <ID>0</ID>
  </Header>
  <TSProperty  Type="TICKETTYPE">
  <Action>${action}</Action>
  <ID>${product._id}</ID>
  <Name>${product.name}</Name>
  </TSProperty>
  </TSData>`;
}

module.exports = {
  getBlockedSubscriber,
  getActiveSubscriber,
  getRecords,
  getOrderEnvelope,
  getPersonCategoryEnvelope,
  getStationEnvelope,
  getNewProductEnvelope
};
