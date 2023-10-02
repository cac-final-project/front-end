declare global {
    type TNeighborhood = string;
    type TLat = string;
    type TLon = string;
    type TToken = string | null;
    type TUsername = string | null;
    type TPassword = string | null;
    type TIsLoggedIn = boolean;
    type TUserType = string | null;
}

type KeyValuePairNeighborhood = [string, TNeighborhood];
type KeyValuePairLat = [string, TLat];
type KeyValuePairLon = [string, TLon];
type KeyValuePairToken = [string, TToken];
type KeyValuePairUsername = [string, TUsername];
type KeyValuePairPassword = [string, TPassword];
type KeyValuePairIsLoggedIn = [string, TIsLoggedIn];
type KeyValuePairUserType = [string, TUserType];

export const KEYS_AND_DEFAULT = {
    neighborhood: ['@neighborhood', 'Wells Branch'] as KeyValuePairNeighborhood,
    lat: ['@lat', '30.270409'] as KeyValuePairLat,
    lon: ['@lon', '-97.744708'] as KeyValuePairLon,
    token: ['@token', null] as KeyValuePairToken,
    username: ['@username', null] as KeyValuePairUsername,
    password: ['@password', null] as KeyValuePairPassword,
    isLoggedIn: ['@isLoggedIn', false] as KeyValuePairIsLoggedIn,
    userType: ['@userType', null] as KeyValuePairUserType,
};
