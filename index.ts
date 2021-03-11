import App from './app';
import CampaignsController from './controllers/campaigns/campaigns.controller';
import FiltersController from './controllers/filters/filters.controller';
import PlaylistsController from './controllers/playlists/playlists.controller';
import SongsController from './controllers/songs/songs.controller';
import StreamsController from './controllers/streams/streams.controller';

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