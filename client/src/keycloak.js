import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://keycloak-poc-cs-resource-utilization-portal.apps.openshift-01.akaza.lk',
  realm:'myrealm',
  clientId: 'react-client' 
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;