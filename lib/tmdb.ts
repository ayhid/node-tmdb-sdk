import type {
  CollectionDetailsData,
  CompanyDetailsData,
  CompanyMoviesData,
  ConfigurationDetailsData,
  MovieAlternativeTitlesData,
  MovieCreditsData,
  MovieDetailsData,
  MovieImagesData,
  MovieKeywordsData,
  MovieLatestData,
  MovieNowPlayingData,
  MoviePopularData,
  MovieReleaseDatesData,
  MovieTopRatedData,
  MovieTranslationsData,
  MovieVideosData,
  PersonDetailsData,
  PersonImagesData,
  PersonMovieCreditsData,
  SearchMovieData,
  SearchPersonData,
} from '../src/types/types.gen';

type ApiVersion = 'v3' | 'v4';

export type TMDBOptions = {
  apiKey?: string;
  accessToken?: string;
  version?: ApiVersion;
  baseURL?: string;
};

// Type-safe endpoint paths
const Endpoints = {
  SEARCH_MOVIE: '/search/movie',
  SEARCH_PERSON: '/search/person',
  MOVIE_DETAILS: '/movie/{movie_id}',
  MOVIE_CREDITS: '/movie/{movie_id}/credits',
  MOVIE_IMAGES: '/movie/{movie_id}/images',
  MOVIE_KEYWORDS: '/movie/{movie_id}/keywords',
  MOVIE_RELEASES: '/movie/{movie_id}/release_dates',
  MOVIE_VIDEOS: '/movie/{movie_id}/videos',
  MOVIE_TRANSLATIONS: '/movie/{movie_id}/translations',
  MOVIE_ALTERNATIVE_TITLES: '/movie/{movie_id}/alternative_titles',
  PERSON_DETAILS: '/person/{person_id}',
  PERSON_MOVIE_CREDITS: '/person/{person_id}/movie_credits',
  PERSON_IMAGES: '/person/{person_id}/images',
  COMPANY_DETAILS: '/company/{company_id}',
  COMPANY_MOVIES: '/company/{company_id}/movies',
  COLLECTION_DETAILS: '/collection/{collection_id}',
  CONFIGURATION: '/configuration',
  MOVIE_LATEST: '/movie/latest',
  MOVIE_NOW_PLAYING: '/movie/now_playing',
  MOVIE_POPULAR: '/movie/popular',
  MOVIE_TOP_RATED: '/movie/top_rated',
} as const;

type Operations = {
  [Endpoints.SEARCH_MOVIE]: {
    get: {
      parameters: SearchMovieData;
      responses: { 200: SearchMovieData };
    };
  };
  [Endpoints.MOVIE_DETAILS]: {
    get: {
      parameters: MovieDetailsData;
      responses: { 200: MovieDetailsData };
    };
  };
  [Endpoints.CONFIGURATION]: {
    get: {
      parameters: ConfigurationDetailsData;
      responses: { 200: ConfigurationDetailsData };
    };
  };
  [Endpoints.SEARCH_PERSON]: {
    get: {
      parameters: SearchPersonData;
      responses: { 200: SearchPersonData };
    };
  };
  [Endpoints.PERSON_DETAILS]: {
    get: {
      parameters: PersonDetailsData;
      responses: { 200: PersonDetailsData };
    };
  };
  [Endpoints.PERSON_MOVIE_CREDITS]: {
    get: {
      parameters: PersonMovieCreditsData;
      responses: { 200: PersonMovieCreditsData };
    };
  };
  [Endpoints.PERSON_IMAGES]: {
    get: {
      parameters: PersonImagesData;
      responses: { 200: PersonImagesData };
    };
  };
  [Endpoints.COMPANY_DETAILS]: {
    get: {
      parameters: CompanyDetailsData;
      responses: { 200: CompanyDetailsData };
    };
  };
  [Endpoints.COMPANY_MOVIES]: {
    get: {
      parameters: CompanyMoviesData;
      responses: { 200: CompanyMoviesData };
    };
  };
  [Endpoints.COLLECTION_DETAILS]: {
    get: {
      parameters: CollectionDetailsData;
      responses: { 200: CollectionDetailsData };
    };
  };
  [Endpoints.MOVIE_CREDITS]: {
    get: {
      parameters: MovieCreditsData;
      responses: { 200: MovieCreditsData };
    };
  };
  [Endpoints.MOVIE_IMAGES]: {
    get: {
      parameters: MovieImagesData;
      responses: { 200: MovieImagesData };
    };
  };
  [Endpoints.MOVIE_KEYWORDS]: {
    get: {
      parameters: MovieKeywordsData;
      responses: { 200: MovieKeywordsData };
    };
  };
  [Endpoints.MOVIE_RELEASES]: {
    get: {
      parameters: MovieReleaseDatesData;
      responses: { 200: MovieReleaseDatesData };
    };
  };
  [Endpoints.MOVIE_VIDEOS]: {
    get: {
      parameters: MovieVideosData;
      responses: { 200: MovieVideosData };
    };
  };
  [Endpoints.MOVIE_TRANSLATIONS]: {
    get: {
      parameters: MovieTranslationsData;
      responses: { 200: MovieTranslationsData };
    };
  };
  [Endpoints.MOVIE_ALTERNATIVE_TITLES]: {
    get: {
      parameters: MovieAlternativeTitlesData;
      responses: { 200: MovieAlternativeTitlesData };
    };
  };
  [Endpoints.MOVIE_LATEST]: {
    get: {
      parameters: MovieLatestData;
      responses: { 200: MovieLatestData };
    };
  };
  [Endpoints.MOVIE_NOW_PLAYING]: {
    get: {
      parameters: MovieNowPlayingData;
      responses: { 200: MovieNowPlayingData };
    };
  };
  [Endpoints.MOVIE_POPULAR]: {
    get: {
      parameters: MoviePopularData;
      responses: { 200: MoviePopularData };
    };
  };
  [Endpoints.MOVIE_TOP_RATED]: {
    get: {
      parameters: MovieTopRatedData;
      responses: { 200: MovieTopRatedData };
    };
  };
};

type PathsWithMethod = {
  [P in keyof Operations]: {
    [M in keyof Operations[P]]: Operations[P][M];
  };
};

export class TMDB {
  private apiKey: string | undefined;
  private accessToken: string | undefined;
  private baseURL: string;
  private headers: HeadersInit;
  private version: ApiVersion;
  private language: string = 'en-US';
  private readonly defaultLanguage: string = 'en-US';

  person = {
    info: (person_id: number): Promise<PersonDetailsData> =>
      this.request(Endpoints.PERSON_DETAILS, 'get', { person_id }),
    credits: (person_id: number): Promise<PersonMovieCreditsData> =>
      this.request(Endpoints.PERSON_MOVIE_CREDITS, 'get', { person_id }),
    images: (person_id: number): Promise<PersonImagesData> =>
      this.request(Endpoints.PERSON_IMAGES, 'get', { person_id }),
  };

  search = {
    movie: (query: string, page?: number): Promise<SearchMovieData> =>
      this.request(Endpoints.SEARCH_MOVIE, 'get', { query, page }),
    person: (query: string, page?: number): Promise<SearchPersonData> =>
      this.request(Endpoints.SEARCH_PERSON, 'get', { query, page }),
  };

  company = {
    info: (company_id: number): Promise<CompanyDetailsData> =>
      this.request(Endpoints.COMPANY_DETAILS, 'get', { company_id }),
    movies: (company_id: number): Promise<CompanyMoviesData> =>
      this.request(Endpoints.COMPANY_MOVIES, 'get', { company_id }),
  };

  collection = {
    info: (collection_id: number): Promise<CollectionDetailsData> =>
      this.request(Endpoints.COLLECTION_DETAILS, 'get', { collection_id }),
  };

  movie = {
    info: (params: { id?: number; imdb_id?: string }): Promise<MovieDetailsData> =>
      this.request(Endpoints.MOVIE_DETAILS, 'get', {
        movie_id: params.id,
        language: this.language,
      }),
    alternativeTitles: (params: { id: number }): Promise<MovieAlternativeTitlesData> =>
      this.request(Endpoints.MOVIE_ALTERNATIVE_TITLES, 'get', { movie_id: params.id }),
    credits: (params: { id: number }): Promise<MovieCreditsData> =>
      this.request(Endpoints.MOVIE_CREDITS, 'get', { movie_id: params.id }),
    images: (params: { id: number }): Promise<MovieImagesData> =>
      this.request(Endpoints.MOVIE_IMAGES, 'get', { movie_id: params.id }),
    keywords: (params: { id: number }): Promise<MovieKeywordsData> =>
      this.request(Endpoints.MOVIE_KEYWORDS, 'get', { movie_id: params.id }),
    releases: (params: { id: number }): Promise<MovieReleaseDatesData> =>
      this.request(Endpoints.MOVIE_RELEASES, 'get', { movie_id: params.id }),
    videos: (params: { id: number }): Promise<MovieVideosData> =>
      this.request(Endpoints.MOVIE_VIDEOS, 'get', { movie_id: params.id }),
    translations: (params: { id: number }): Promise<MovieTranslationsData> =>
      this.request(Endpoints.MOVIE_TRANSLATIONS, 'get', { movie_id: params.id }),
  };

  misc = {
    latest: (): Promise<MovieLatestData> => this.request(Endpoints.MOVIE_LATEST, 'get'),
    nowPlaying: (): Promise<MovieNowPlayingData> =>
      this.request(Endpoints.MOVIE_NOW_PLAYING, 'get'),
    popular: (): Promise<MoviePopularData> => this.request(Endpoints.MOVIE_POPULAR, 'get'),
    topRated: (): Promise<MovieTopRatedData> => this.request(Endpoints.MOVIE_TOP_RATED, 'get'),
  };

  constructor(options: TMDBOptions = {}) {
    const { apiKey, accessToken, version = 'v3', baseURL = 'https://api.themoviedb.org' } = options;

    if (!apiKey && !accessToken) {
      throw new Error('Either apiKey or accessToken must be provided');
    }

    this.apiKey = apiKey;
    this.accessToken = accessToken;
    this.version = version;
    this.baseURL = baseURL;

    const auth = accessToken ? `Bearer ${accessToken}` : apiKey;
    this.headers = {
      Authorization: auth,
      'Content-Type': 'application/json',
    };
  }

  private async request<
    TPath extends keyof PathsWithMethod,
    TMethod extends keyof PathsWithMethod[TPath],
    TParams extends PathsWithMethod[TPath][TMethod]['parameters'],
    TResponse extends PathsWithMethod[TPath][TMethod]['responses'][200],
  >(path: TPath, method: TMethod, params?: TParams): Promise<TResponse> {
    const url = new URL(`${this.baseURL}/${this.version}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.accessToken) {
      headers.append('Authorization', `Bearer ${this.accessToken}`);
    } else if (this.apiKey) {
      url.searchParams.append('api_key', this.apiKey);
    }

    const response = await fetch(url.toString(), {
      method: method.toString().toUpperCase(),
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  resetLanguage(): void {
    this.language = this.defaultLanguage;
  }

  configuration(): Promise<ConfigurationDetailsData> {
    return this.request(Endpoints.CONFIGURATION, 'get');
  }
}

export function init(apikey: string): TMDB {
  return new TMDB({ apiKey: apikey });
}
