import type {
  CollectionDetailsData,
  CollectionDetailsResponse,
  CompanyDetailsData,
  CompanyDetailsResponse,
  CompanyImagesData,
  CompanyImagesResponse,
  ConfigurationDetailsResponse,
  MovieAlternativeTitlesData,
  MovieAlternativeTitlesResponse,
  MovieCreditsData,
  MovieCreditsResponse,
  MovieDetailsData,
  MovieDetailsResponse,
  MovieImagesData,
  MovieImagesResponse,
  MovieKeywordsData,
  MovieKeywordsResponse,
  MovieLatestIdResponse,
  MovieNowPlayingListResponse,
  MoviePopularListResponse,
  MovieReleaseDatesData,
  MovieReleaseDatesResponse,
  MovieTopRatedListResponse,
  MovieTranslationsData,
  MovieTranslationsResponse,
  MovieVideosData,
  MovieVideosResponse,
  PersonDetailsData,
  PersonDetailsResponse,
  PersonImagesData,
  PersonImagesResponse,
  PersonMovieCreditsData,
  PersonMovieCreditsResponse,
  SearchMovieData,
  SearchMovieResponse,
  SearchPersonData,
  SearchPersonResponse,
} from '../src/types/types.gen';

type ApiVersion = '3';

type TMDBOptions = {
  apiKey?: string;
  accessToken?: string;
  version?: ApiVersion;
  baseURL?: string;
  language?: string;
};

export type Operations = {
  '/3/configuration': {
    get: {
      parameters: never;
      responses: { 200: ConfigurationDetailsResponse };
    };
  };
  '/3/person/{person_id}': {
    get: {
      parameters: PersonDetailsData;
      responses: { 200: PersonDetailsResponse };
    };
  };
  '/3/person/{person_id}/movie_credits': {
    get: {
      parameters: PersonMovieCreditsData;
      responses: { 200: PersonMovieCreditsResponse };
    };
  };
  '/3/person/{person_id}/images': {
    get: {
      parameters: PersonImagesData;
      responses: { 200: PersonImagesResponse };
    };
  };
  '/3/search/movie': {
    get: {
      parameters: SearchMovieData;
      responses: { 200: SearchMovieResponse };
    };
  };
  '/3/search/person': {
    get: {
      parameters: SearchPersonData;
      responses: { 200: SearchPersonResponse };
    };
  };
  '/3/company/{company_id}': {
    get: {
      parameters: CompanyDetailsData;
      responses: { 200: CompanyDetailsResponse };
    };
  };
  '/3/company/{company_id}/images': {
    get: {
      parameters: CompanyImagesData;
      responses: { 200: CompanyImagesResponse };
    };
  };
  '/3/collection/{collection_id}': {
    get: {
      parameters: CollectionDetailsData;
      responses: { 200: CollectionDetailsResponse };
    };
  };
  '/3/movie/{movie_id}': {
    get: {
      parameters: MovieDetailsData;
      responses: { 200: MovieDetailsResponse };
    };
  };
  '/3/movie/{movie_id}/alternative_titles': {
    get: {
      parameters: MovieAlternativeTitlesData;
      responses: { 200: MovieAlternativeTitlesResponse };
    };
  };
  '/3/movie/{movie_id}/credits': {
    get: {
      parameters: MovieCreditsData;
      responses: { 200: MovieCreditsResponse };
    };
  };
  '/3/movie/{movie_id}/images': {
    get: {
      parameters: MovieImagesData;
      responses: { 200: MovieImagesResponse };
    };
  };
  '/3/movie/{movie_id}/keywords': {
    get: {
      parameters: MovieKeywordsData;
      responses: { 200: MovieKeywordsResponse };
    };
  };
  '/3/movie/{movie_id}/release_dates': {
    get: {
      parameters: MovieReleaseDatesData;
      responses: { 200: MovieReleaseDatesResponse };
    };
  };
  '/3/movie/{movie_id}/videos': {
    get: {
      parameters: MovieVideosData;
      responses: { 200: MovieVideosResponse };
    };
  };
  '/3/movie/{movie_id}/translations': {
    get: {
      parameters: MovieTranslationsData;
      responses: { 200: MovieTranslationsResponse };
    };
  };
  '/3/movie/latest': {
    get: {
      parameters: never;
      responses: { 200: MovieLatestIdResponse };
    };
  };
  '/3/movie/now_playing': {
    get: {
      parameters: never;
      responses: { 200: MovieNowPlayingListResponse };
    };
  };
  '/3/movie/popular': {
    get: {
      parameters: never;
      responses: { 200: MoviePopularListResponse };
    };
  };
  '/3/movie/top_rated': {
    get: {
      parameters: never;
      responses: { 200: MovieTopRatedListResponse };
    };
  };
};

export class TMDB {
  private apiKey: string | undefined;
  private accessToken: string | undefined;
  private baseURL: string;
  private headers: HeadersInit;
  private version: ApiVersion;
  private language: string;
  private readonly defaultLanguage: string = 'en-US';

  person = {
    info: (person_id: number): Promise<PersonDetailsResponse> =>
      this.request('/3/person/{person_id}', 'get', {
        path: { person_id },
        url: '/3/person/{person_id}',
      }),
    credits: (person_id: number): Promise<PersonMovieCreditsResponse> =>
      this.request('/3/person/{person_id}/movie_credits', 'get', {
        path: { person_id },
        url: '/3/person/{person_id}/movie_credits',
      }),
    images: (person_id: number): Promise<PersonImagesResponse> =>
      this.request('/3/person/{person_id}/images', 'get', {
        path: { person_id },
        url: '/3/person/{person_id}/images',
      }),
  };

  search = {
    movie: (query: string, page?: number): Promise<SearchMovieResponse> =>
      this.request('/3/search/movie', 'get', { query: { query, page }, url: '/3/search/movie' }),
    person: (query: string, page?: number): Promise<SearchPersonResponse> =>
      this.request('/3/search/person', 'get', { query: { query, page }, url: '/3/search/person' }),
  };

  company = {
    images: (company_id: number): Promise<CompanyImagesResponse> =>
      this.request('/3/company/{company_id}/images', 'get', {
        path: { company_id },
        url: '/3/company/{company_id}/images',
      }),
    info: (company_id: number): Promise<CompanyDetailsResponse> =>
      this.request('/3/company/{company_id}', 'get', {
        path: { company_id },
        url: '/3/company/{company_id}',
      }),
  };

  collection = {
    info: (collection_id: number): Promise<CollectionDetailsResponse> =>
      this.request('/3/collection/{collection_id}', 'get', {
        path: { collection_id },
        url: '/3/collection/{collection_id}',
      }),
  };

  movie = {
    info: (params: { id: number; imdb_id?: string }): Promise<MovieDetailsResponse> =>
      this.request('/3/movie/{movie_id}', 'get', {
        path: { movie_id: Number(params.id) },
        query: { language: this.language },
        url: '/3/movie/{movie_id}',
      }),
    alternativeTitles: (params: { id: number }): Promise<MovieAlternativeTitlesResponse> =>
      this.request('/3/movie/{movie_id}/alternative_titles', 'get', {
        path: { movie_id: params.id },
        url: '/3/movie/{movie_id}/alternative_titles',
      }),
    credits: (params: { id: number }): Promise<MovieCreditsResponse> =>
      this.request('/3/movie/{movie_id}/credits', 'get', {
        path: { movie_id: params.id },
        url: '/3/movie/{movie_id}/credits',
      }),
    images: (params: { id: number }): Promise<MovieImagesResponse> =>
      this.request('/3/movie/{movie_id}/images', 'get', {
        path: { movie_id: params.id },
        url: '/3/movie/{movie_id}/images',
      }),
    keywords: (params: { id: number }): Promise<MovieKeywordsResponse> =>
      this.request('/3/movie/{movie_id}/keywords', 'get', {
        path: { movie_id: params.id.toString() },
        url: '/3/movie/{movie_id}/keywords',
      }),
    releases: (params: { id: number }): Promise<MovieReleaseDatesResponse> =>
      this.request('/3/movie/{movie_id}/release_dates', 'get', {
        path: { movie_id: params.id },
        url: '/3/movie/{movie_id}/release_dates',
      }),
    videos: (params: { id: number }): Promise<MovieVideosResponse> =>
      this.request('/3/movie/{movie_id}/videos', 'get', {
        path: { movie_id: params.id },
        url: '/3/movie/{movie_id}/videos',
      }),
    translations: (params: { id: number }): Promise<MovieTranslationsResponse> =>
      this.request('/3/movie/{movie_id}/translations', 'get', {
        path: { movie_id: params.id },
        url: '/3/movie/{movie_id}/translations',
      }),
  };

  misc = {
    latest: (): Promise<MovieLatestIdResponse> => this.request('/3/movie/latest', 'get'),
    nowPlaying: (): Promise<MovieNowPlayingListResponse> =>
      this.request('/3/movie/now_playing', 'get'),
    popular: (): Promise<MoviePopularListResponse> => this.request('/3/movie/popular', 'get'),
    topRated: (): Promise<MovieTopRatedListResponse> => this.request('/3/movie/top_rated', 'get'),
  };

  constructor(options: TMDBOptions = {}) {
    this.baseURL = options.baseURL || 'https://api.themoviedb.org';
    this.version = (options.version || '3') as ApiVersion;
    this.language = options.language || 'en-US';
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.apiKey}`,
    };
  }

  private async request<
    TPath extends keyof Operations,
    TMethod extends keyof Operations[TPath] & string,
    TParams extends Operations[TPath][TMethod] extends { parameters: infer P } ? P : never,
    TResponse extends Operations[TPath][TMethod] extends { responses: { 200: infer R } }
      ? R
      : never,
  >(path: TPath, method: TMethod, params?: TParams): Promise<TResponse> {
    const url = new URL(`${this.baseURL}/${this.version}${path as string}`);

    if (params && typeof params === 'object') {
      const paramObj = params as {
        path?: Record<string, string | number>;
        query?: Record<string, string | number>;
      };

      if (paramObj.path) {
        let pathWithParams = path as string;
        for (const [key, value] of Object.entries(paramObj.path)) {
          pathWithParams = pathWithParams.replace(`{${key}}`, value.toString());
        }
        url.pathname = `/${this.version}${pathWithParams}`;
      }

      if (paramObj.query) {
        for (const [key, value] of Object.entries(paramObj.query)) {
          if (value !== undefined) {
            url.searchParams.append(key, value.toString());
          }
        }
      }
    }

    const response = await fetch(url.toString(), {
      method: method.toUpperCase(),
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  resetLanguage(): void {
    this.language = this.defaultLanguage;
  }

  configuration(): Promise<ConfigurationDetailsResponse> {
    return this.request('/3/configuration', 'get');
  }
}

export function init(apikey: string): TMDB {
  return new TMDB({ apiKey: apikey });
}
