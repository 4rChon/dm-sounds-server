import App from './app';
import FiltersController from './controllers/filters/filters.controller';
import PlaylistsController from './controllers/playlists/playlists.controller';
import StreamsController from './controllers/streams/streams.controller';
import SongsController from './controllers/songs/songs.controller';

const app = new App(
  [
    new FiltersController(),
    new PlaylistsController(),
    new StreamsController(),
    new SongsController()
  ], parseInt(process.env.PORT || '')
);

app.listen().on('close', async () => {
  await app.dispose();
});