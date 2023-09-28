declare global {
    type TNeighborhood = string;
    interface Ilocation {
        lat: number;
        lon: number;
    }
    type TLocation = Ilocation;
    type TToken = string | null;
    type TUsername = string | null;
    type TPassword = string | null;
    type TIsLoggedIn = boolean;
}

type KeyValuePairNeighborhood = [string, TNeighborhood];
type KeyValuePairlocation = [string, TLocation];
type KeyValuePairToken = [string, TToken];
type KeyValuePairUsername = [string, TUsername];
type KeyValuePairPassword = [string, TPassword];
type KeyValuePairIsLoggedIn = [string, TIsLoggedIn];

export const KEYS_AND_DEFAULT = {
    neighborhood: ['@neighborhood', 'Wells Branch'] as KeyValuePairNeighborhood,
    location: [
        '@location',
        { lat: 30.433282, lon: 97.676128 },
    ] as KeyValuePairlocation,
    token: ['@token', null] as KeyValuePairToken,
    username: ['@username', null] as KeyValuePairUsername,
    password: ['@password', null] as KeyValuePairPassword,
    isLoggedIn: ['@isLoggedIn', false] as KeyValuePairIsLoggedIn,
};
