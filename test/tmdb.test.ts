import { beforeEach, describe, expect, it, vi } from "vitest";

import { init } from "../lib/tmdb.js";
import { mockResponses } from "./__mocks__/tmdb.mock";

const tmdb = init("fake-api-key");

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  vi.resetAllMocks();
});

describe("General methods", () => {
  it("can get configuration info", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.configuration),
    });

    const res = await tmdb.configuration();
    expect(res).toEqual(mockResponses.configuration);
  });
});

describe("Person methods", () => {
  it("can fetch info on a person", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.person.info),
    });

    const res = await tmdb.person.info(109);
    expect(res.name).toBe("Elijah Wood");
  });

  it("can fetch a person's credits", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.person.credits),
    });

    const res = await tmdb.person.credits(109);
    expect(res.id).toBe(109);
  });

  it("can fetch a person's images", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.person.images),
    });

    const res = await tmdb.person.images(109);
    expect(res.id).toBe(109);
  });
});

describe("Search methods", () => {
  it("can search for movies", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.search.movie),
    });

    const res = await tmdb.search.movie("transformers");
    expect(res.page).toBe(1);
  });

  it("can hop to another page of a search", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.search.moviePage4),
    });

    const res = await tmdb.search.movie("transformers", 4);
    expect(res.page).toBe(4);
  });

  it("can search for persons", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.search.person),
    });

    const res = await tmdb.search.person("mikael");
    expect(res.page).toBe(1);
  });
});

describe("Company methods", () => {
  it("can get info on a company", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.company.info),
    });

    const res = await tmdb.company.info(1);
    expect(res.name).toBe("Lucasfilm");
  });

  it("can fetch what movies a company has produced", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.company.movies),
    });

    const res = await tmdb.company.movies(1);
    expect(res.id).toBe(1);
  });
});

describe("Collection methods", () => {
  it("can get info on collections", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.collection.info),
    });

    const res = await tmdb.collection.info(10);
    expect(res.name).toBe("Star Wars Collection");
  });
});

describe("Movie methods", () => {
  it("can get info on a movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.info),
    });

    const res = await tmdb.movie.info({ id: 11 });
    expect(res.title).toBe("Star Wars: Episode IV - A New Hope");
  });

  it("can get info on a movie, in french", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.infoFr),
    });

    tmdb.setLanguage("fr");
    const res = await tmdb.movie.info({ id: 11 });
    expect(res.title).toBe("Star Wars : Épisode IV - Un nouvel espoir");
    tmdb.resetLanguage();
  });

  it("can get data with an imdb-id", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.info),
    });

    const res = await tmdb.movie.info({ imdb_id: "tt0076759" });
    expect(res.title).toBe("Star Wars: Episode IV - A New Hope");
  });

  it("can get data with an imdb-id, in french", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.infoFr),
    });

    tmdb.setLanguage("fr");
    const res = await tmdb.movie.info({ imdb_id: "tt0076759" });
    expect(res.title).toBe("Star Wars : Épisode IV - Un nouvel espoir");
    tmdb.resetLanguage();
  });

  it("can get alternative titles for a movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.alternativeTitles),
    });

    const res = await tmdb.movie.alternativeTitles({ id: 11 });
    expect(res.id).toBe(11);
  });

  it("can detect invalid ids", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(tmdb.movie.info({ id: 1000000001 })).rejects.toThrow(
      "HTTP error! status: 404"
    );
  });

  it("can fetch a movie's credits", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.credits),
    });

    const res = await tmdb.movie.credits({ id: 11 });
    expect(res.id).toBe(11);
    expect(res.cast[0].character).toBe("Luke Skywalker");
    expect(res.crew[0].job).toBe("Director");
  });

  it("can get images for a movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.images),
    });

    const res = await tmdb.movie.images({ id: 11 });
    expect(res.id).toBe(11);
  });

  it("can get keywords for a movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.keywords),
    });

    const res = await tmdb.movie.keywords({ id: 11 });
    expect(res.id).toBe(11);
  });

  it("can get release dates for a movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.releases),
    });

    const res = await tmdb.movie.releases({ id: 11 });
    expect(res.id).toBe(11);
  });

  it("can fetch a movie's videos", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.videos),
    });

    const res = await tmdb.movie.videos({ id: 11 });
    expect(res.id).toBe(11);
    expect(res.results[0].site).toBe("YouTube");
  });

  it("can get translations for a movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.movie.translations),
    });

    const res = await tmdb.movie.translations({ id: 11 });
    expect(res.id).toBe(11);
  });
});

describe("Misc methods", () => {
  it("can get the latest added movie", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.misc.latest),
    });

    const res = await tmdb.misc.latest();
    expect(res).toBeDefined();
  });

  it("can get the movies playing in theaters", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.misc.nowPlaying),
    });

    const res = await tmdb.misc.nowPlaying();
    expect(res.total_results).toBe(100);
  });

  it("can get popular movies", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.misc.popular),
    });

    const res = await tmdb.misc.popular();
    expect(res.page).toBe(1);
  });

  it("can get the top rated movies", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponses.misc.topRated),
    });

    const res = await tmdb.misc.topRated();
    expect(res.page).toBe(1);
  });
});
