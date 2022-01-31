import App from './app';
import CampaignsController from './controllers/campaigns.controller';
import FiltersController from './controllers/filters.controller';
import PlaylistsController from './controllers/playlists.controller';
import SongsController from './controllers/songs.controller';
import StreamsController from './controllers/streams.controller';

const app = new App(
  [
    new FiltersController(),
    new PlaylistsController(),
    new StreamsController(),
    new SongsController(),
    new CampaignsController()
  ], parseInt(process.env.PORT || '')
);

app.listen().on('close', async () => {
  await app.dispose();
});