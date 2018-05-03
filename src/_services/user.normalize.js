/**
 * Normalize user from api
 *
 * @param {Object} rawUser - user record from API
 * @return {Object} normalized user
 */
export function normalize(rawUser) {
  const {
    id,
    createdAt,
    modifiedAt,
    firstName,
    lastName,
    phoneNumber,
    email,
    clientId
  } = rawUser;

  return {
    id,
    createdAt: createdAt ? new Date(createdAt) : createdAt,
    modifiedAt: modifiedAt ? new Date(modifiedAt) : modifiedAt,
    firstName,
    lastName,
    phoneNumber,
    email,
    clientId
  };
}
