import { SocialVideo, AppStoreShowcase, WebGame, SystemStats } from "@playnest/shared-types";

// PlayNest Database Store managed exclusively by Backend API Gateway (apps/api)
let videosStore: SocialVideo[] = [];
let appsStore: AppStoreShowcase[] = [];
let gamesStore: WebGame[] = [];

export const getVideos = () => videosStore;
export const addVideo = (video: SocialVideo) => {
  videosStore = [video, ...videosStore];
  return video;
};
export const deleteVideo = (id: string) => {
  videosStore = videosStore.filter((v) => v.id !== id);
};

export const getApps = () => appsStore;
export const addApp = (app: AppStoreShowcase) => {
  appsStore = [app, ...appsStore];
  return app;
};
export const incrementAppClick = (id: string) => {
  const item = appsStore.find((a) => a.id === id);
  if (item) item.clickCount += 1;
};

export const getGames = () => gamesStore;
export const addGame = (game: WebGame) => {
  gamesStore = [game, ...gamesStore];
  return game;
};
export const incrementGamePlay = (id: string) => {
  const game = gamesStore.find((g) => g.id === id);
  if (game) game.playsCount += 1;
};

export const getStats = (): SystemStats => ({
  totalVideos: videosStore.length,
  totalApps: appsStore.length,
  totalGames: gamesStore.length,
  totalGamePlays: gamesStore.reduce((acc, g) => acc + g.playsCount, 0),
  totalVideoViews: videosStore.reduce((acc, v) => acc + v.viewsCount, 0),
  totalAppClicks: appsStore.reduce((acc, a) => acc + a.clickCount, 0),
  contactEmail: "contact@playnest.zone",
  updatedAt: new Date().toISOString(),
});
