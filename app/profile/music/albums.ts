// The albums on the Music page (/profile/music), in the order they show.
//
// To add one: add an entry with its title, its artist, and its Spotify link
// (in Spotify, Share › Copy link to album; the part after “?” can go), then
// run `npm run albums:covers` to save its cover next to this file, and
// commit both.

export interface Album {
  title: string;
  artist: string;
  /** The album's Spotify link: https://open.spotify.com/album/<id> */
  spotifyUrl: string;
}

export const ALBUMS: Album[] = [
  { title: 'LUX', artist: 'Rosalía', spotifyUrl: 'https://open.spotify.com/album/3SUEJULSGgBDG1j4GQhfYY' },
  { title: 'Jean', artist: 'Yebba', spotifyUrl: 'https://open.spotify.com/album/27SQuR7jPiGkJJXl8njEqY' },
  { title: 'Preacher’s Daughter', artist: 'Ethel Cain', spotifyUrl: 'https://open.spotify.com/album/3WmujGwOS0ANHkJRnMH6n8' },
  { title: 'Ænema', artist: 'Tool', spotifyUrl: 'https://open.spotify.com/album/6yWMN087PgSimbcVmHLEwG' },
  { title: 'Ctrl', artist: 'SZA', spotifyUrl: 'https://open.spotify.com/album/76290XdXVF9rPzGdNRWdCh' },
  { title: 'Lady Wood', artist: 'Tove Lo', spotifyUrl: 'https://open.spotify.com/album/1tuekzsMZQOuiMejKP6t2Y' },
  { title: 'The Baby', artist: 'Samia', spotifyUrl: 'https://open.spotify.com/album/7faAwJDTt9Y8kVAcSHy9Y6' },
  { title: 'Extraordinary Machine', artist: 'Fiona Apple', spotifyUrl: 'https://open.spotify.com/album/1z0O8lKuQRs974S8wcRiAs' },
  { title: 'Evolve', artist: 'Ani DiFranco', spotifyUrl: 'https://open.spotify.com/album/4nhMU81Bwp3jMtUhbMcJuM' },
  { title: 'Ladies of the Canyon', artist: 'Joni Mitchell', spotifyUrl: 'https://open.spotify.com/album/7JOdtLDLyXJIppDRB7kxr9' },
  { title: 'Adrenaline', artist: 'Deftones', spotifyUrl: 'https://open.spotify.com/album/30YN03R4Bjl8Qwz8wPRoXG' },
  { title: 'Between the Lines', artist: 'Janis Ian', spotifyUrl: 'https://open.spotify.com/album/6RjDm4cjV3MFndKrpLUxpO' },
  { title: 'Les Misérables (1987 Original Broadway Cast)', artist: 'Various Artists', spotifyUrl: 'https://open.spotify.com/album/3jbKDx0zB1QoJQTw8i1AvD' },
  { title: 'Tracy Chapman', artist: 'Tracy Chapman', spotifyUrl: 'https://open.spotify.com/album/6hmmX5UP4rIvOpGSaPerV8' },
  { title: 'Mortal City', artist: 'Dar Williams', spotifyUrl: 'https://open.spotify.com/album/6EVUAMSaUKG6mxVQcWDdJG' },
  { title: 'The Long Black Veil', artist: 'The Chieftains', spotifyUrl: 'https://open.spotify.com/album/1rClywJWYiXuEZOpOqQMC0' },
  { title: 'Charli', artist: 'Charli XCX', spotifyUrl: 'https://open.spotify.com/album/386IqvSuljaZsMjwDGGdLj' },
  { title: 'Modus Vivendi', artist: '070 Shake', spotifyUrl: 'https://open.spotify.com/album/6Q2rUMVAKj1DaDh3xB0IEU' },
  { title: 'Burn Your Fire for No Witness', artist: 'Angel Olsen', spotifyUrl: 'https://open.spotify.com/album/62RDt42wD8VdrhfHG6IzpC' },
  { title: 'Communicating', artist: 'Hundred Waters', spotifyUrl: 'https://open.spotify.com/album/279dACgF1PQRUDyQFFW0Xj' },
  { title: 'Dirt Femme', artist: 'Tove Lo', spotifyUrl: 'https://open.spotify.com/album/3755MjOhMsW1I9u9mh3xPF' },
  { title: 'Citizens of Glass', artist: 'Agnes Obel', spotifyUrl: 'https://open.spotify.com/album/78BjMfLH8YUXM6hbodHKmA' },
];
