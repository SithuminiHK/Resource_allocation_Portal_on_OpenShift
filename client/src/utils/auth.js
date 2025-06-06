
export const getUserRole = (keycloak) => {
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  if (roles.includes('super-admin')) return 'super-admin';
  if (roles.includes('operators')) return 'operator';
  if (roles.includes('view-only')) return 'viewer';
  return 'unknown';
};
