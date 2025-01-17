import type {
  SearchMovieData,
  MovieDetailsData,
  ConfigurationDetailsData,
  SearchPersonData,
  TvSeriesDetailsData,
  MovieCreditsData,
  MovieImagesData,
  MovieKeywordsData,
  MovieReleaseDatesData,
  MovieVideosData,
  MovieTranslationsData,
  MovieAlternativeTitlesData,
  PersonDetailsData,
  PersonMovieCreditsData,
  PersonImagesData,
  CompanyDetailsData,
  CompanyMoviesData,
  CollectionDetailsData,
  MovieLatestData,
  MovieNowPlayingData,
  MoviePopularData,
  MovieTopRatedData,
} from "../src/types/types.gen";

type ApiVersion = "v3" | "v4";

export type TMDBOptions = {
  apiKey?: string;
  accessToken?: string;
  version?: ApiVersion;
  baseURL?: string;
};

// Type-safe endpoint paths
const Endpoints = {
  SEARCH_MOVIE: "/search/movie",
  SEARCH_PERSON: "/search/person",
  MOVIE_DETAILS: "/movie/{movie_id}",
  MOVIE_CREDITS: "/movie/{movie_id}/credits",
  MOVIE_IMAGES: "/movie/{movie_id}/images",
  MOVIE_KEYWORDS: "/movie/{movie_id}/keywords",
  MOVIE_RELEASES: "/movie/{movie_id}/release_dates",
  MOVIE_VIDEOS: "/movie/{movie_id}/videos",
  MOVIE_TRANSLATIONS: "/movie/{movie_id}/translations",
  MOVIE_ALTERNATIVE_TITLES: "/movie/{movie_id}/alternative_titles",
  PERSON_DETAILS: "/person/{person_id}",
  PERSON_MOVIE_CREDITS: "/person/{person_id}/movie_credits",
  PERSON_IMAGES: "/person/{person_id}/images",
  COMPANY_DETAILS: "/company/{company_id}",
  COMPANY_MOVIES: "/company/{company_id}/movies",
  COLLECTION_DETAILS: "/collection/{collection_id}",
  CONFIGURATION: "/configuration",
  MOVIE_LATEST: "/movie/latest",
  MOVIE_NOW_PLAYING: "/movie/now_playing",
  MOVIE_POPULAR: "/movie/popular",
  MOVIE_TOP_RATED: "/movie/top_rated",
} as const;

type Operations = {
  [Endpoints.SEARCH_MOVIE]: {
    get: {
      parameters: SearchMovieData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_DETAILS]: {
    get: {
      parameters: MovieDetailsData;
      responses: { 200: any };
    };
  };
  [Endpoints.CONFIGURATION]: {
    get: {
      parameters: ConfigurationDetailsData;
      responses: { 200: any };
    };
  };
  [Endpoints.SEARCH_PERSON]: {
    get: {
      parameters: SearchPersonData;
      responses: { 200: any };
    };
  };
  [Endpoints.PERSON_DETAILS]: {
    get: {
      parameters: PersonDetailsData;
      responses: { 200: any };
    };
  };
  [Endpoints.PERSON_MOVIE_CREDITS]: {
    get: {
      parameters: PersonMovieCreditsData;
      responses: { 200: any };
    };
  };
  [Endpoints.PERSON_IMAGES]: {
    get: {
      parameters: PersonImagesData;
      responses: { 200: any };
    };
  };
  [Endpoints.COMPANY_DETAILS]: {
    get: {
      parameters: CompanyDetailsData;
      responses: { 200: any };
    };
  };
  [Endpoints.COMPANY_MOVIES]: {
    get: {
      parameters: CompanyMoviesData;
      responses: { 200: any };
    };
  };
  [Endpoints.COLLECTION_DETAILS]: {
    get: {
      parameters: CollectionDetailsData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_CREDITS]: {
    get: {
      parameters: MovieCreditsData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_IMAGES]: {
    get: {
      parameters: MovieImagesData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_KEYWORDS]: {
    get: {
      parameters: MovieKeywordsData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_RELEASES]: {
    get: {
      parameters: MovieReleaseDatesData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_VIDEOS]: {
    get: {
      parameters: MovieVideosData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_TRANSLATIONS]: {
    get: {
      parameters: MovieTranslationsData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_ALTERNATIVE_TITLES]: {
    get: {
      parameters: MovieAlternativeTitlesData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_LATEST]: {
    get: {
      parameters: MovieLatestData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_NOW_PLAYING]: {
    get: {
      parameters: MovieNowPlayingData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_POPULAR]: {
    get: {
      parameters: MoviePopularData;
      responses: { 200: any };
    };
  };
  [Endpoints.MOVIE_TOP_RATED]: {
    get: {
      parameters: MovieTopRatedData;
      responses: { 200: any };
    };
  };
};

type PathsWithMethod = {
  [P in keyof Operations]: {
    [M in keyof Operations[P]]: Operations[P][M];
  };
};

export class TMDB {
  private baseURL: string;
  private headers: HeadersInit;
  private version: ApiVersion;
  private language: string = "en-US";
  private readonly defaultLanguage: string = "en-US";

  person = {
    info: (person_id: number) =>
      this.request(Endpoints.PERSON_DETAILS, "get", { person_id }),
    credits: (person_id: number) =>
      this.request(Endpoints.PERSON_MOVIE_CREDITS, "get", { person_id }),
    images: (person_id: number) =>
      this.request(Endpoints.PERSON_IMAGES, "get", { person_id }),
  };

  search = {
    movie: (query: string, page?: number) =>
      this.request(Endpoints.SEARCH_MOVIE, "get", { query, page }),
    person: (query: string, page?: number) =>
      this.request(Endpoints.SEARCH_PERSON, "get", { query, page }),
  };

  company = {
    info: (company_id: number) =>
      this.request(Endpoints.COMPANY_DETAILS, "get", { company_id }),
    movies: (company_id: number) =>
      this.request(Endpoints.COMPANY_MOVIES, "get", { company_id }),
  };

  collection = {
    info: (collection_id: number) =>
      this.request(Endpoints.COLLECTION_DETAILS, "get", { collection_id }),
  };

  movie = {
    info: (params: { id?: number; imdb_id?: string }) =>
      this.request(Endpoints.MOVIE_DETAILS, "get", { movie_id: params.id, language: this.language }),
    alternativeTitles: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_ALTERNATIVE_TITLES, "get", { movie_id: params.id }),
    credits: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_CREDITS, "get", { movie_id: params.id }),
    images: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_IMAGES, "get", { movie_id: params.id }),
    keywords: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_KEYWORDS, "get", { movie_id: params.id }),
    releases: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_RELEASES, "get", { movie_id: params.id }),
    videos: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_VIDEOS, "get", { movie_id: params.id }),
    translations: (params: { id: number }) =>
      this.request(Endpoints.MOVIE_TRANSLATIONS, "get", { movie_id: params.id }),
  };

  misc = {
    latest: () => this.request(Endpoints.MOVIE_LATEST, "get"),
    nowPlaying: () => this.request(Endpoints.MOVIE_NOW_PLAYING, "get"),
    popular: () => this.request(Endpoints.MOVIE_POPULAR, "get"),
    topRated: () => this.request(Endpoints.MOVIE_TOP_RATED, "get"),
  };

  constructor(options: TMDBOptions = {}) {
    const {
      apiKey,
      accessToken,
      version = "v3",
      baseURL = "https://api.themoviedb.org",
    } = options;

    if (!apiKey && !accessToken) {
      throw new Error("Either apiKey or accessToken must be provided");
    }

    this.version = version;
    this.baseURL = `${baseURL}/${version}`;

    const auth = accessToken ? `Bearer ${accessToken}` : apiKey;
    this.headers = {
      Authorization: auth,
      "Content-Type": "application/json",
    };
  }

  // Helper method to make API calls with proper typing
  private async request<
    P extends keyof PathsWithMethod,
    M extends keyof PathsWithMethod[P],
    Req = PathsWithMethod[P][M]["parameters"],
    Res = PathsWithMethod[P][M]["responses"][200]["content"]["application/json"]
  >(
    path: P,
    method: M,
    params?: Req extends { query?: any } ? Req["query"] : never,
    data?: Req extends {
      requestBody?: { content: { "application/json": any } };
    }
      ? Req["requestBody"]["content"]["application/json"]
      : never
  ): Promise<Res> {
    const url = new URL(`${this.baseURL}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url, {
      method: method as string,
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  setLanguage(language: string) {
    this.language = language;
  }

  resetLanguage() {
    this.language = this.defaultLanguage;
  }

  configuration() {
    return this.request(Endpoints.CONFIGURATION, "get");
  }
}

export function init(apikey: string): TMDB {
  return new TMDB({ apiKey: apikey });
}
