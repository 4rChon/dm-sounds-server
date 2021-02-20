import App from './app';
import PlaylistsController from './controllers/playlists/playlists.controller';
import StreamsController from './controllers/streams/streams.controller';

const app = new App(
  [
    new PlaylistsController(),
    new StreamsController()
  ], 3000
);

app.listen().on('close', async () => {
  await app.dispose();
});