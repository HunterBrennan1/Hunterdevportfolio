// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAEhSbg-pvgDiQeafrQHLZ-W7WWEmZPrJDmx05C2XQu-u6nJiD5XEKcrj4jHqPrXvGkVVmaotzK9JA1n-IR-uKTGNVce_WbO1KBA4-XYcCM0fRK-hcnu08NOT6GJawiUelkJTJgBxWU2TMezkVse3b8qfr-Rjunv44mVp8kjLiv0BsLASKo8iyjRpGA9cUrLDxpoHf01Oj6poJx9clVV057bWFNA05zMZm_KZi8-tnFeDWMkWYatFYFaJYukvcdiCs2ZVUtJJg';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:3II5NhDhjzIessLfaSjPQn', 'spotify:track:6atZcQylo7uGGn0LkAhmbd', 'spotify:track:1hkguHC33aftQObI7mOcoj', 'spotify:track:2xkCK64mVslpApVL7i6Mxj', 'spotify:track:3EMaNLX6Ho5ouuA0vUDGq6', 'spotify:track:5uXb6ZW5eJmPmy9VZZn8Tm', 'spotify:track:2dHNeQOgkDxcheR65nUg7p', 'spotify:track:7KA4W4McWYRpgf0fWsJZWB', 'spotify:track:4v1NdP9omUeesYvYrVAv2I', 'spotify:track:3eMpDpuaxr1QFnVSSfv9Zf'
];

async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
    "name": "My recommendation playlist",
    "description": "Playlist created by the tutorial on developer.spotify.com",
    "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);