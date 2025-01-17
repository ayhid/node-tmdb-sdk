declare global {
  interface String {
    format(...args: any[]): string;
  }
}

String.prototype.format = function (this: string, ...args: any[]): string {
  let content = this;
  for (let i = 0; i < args.length; i++) {
    const replacement = "{" + i + "}";
    content = content.replace(replacement, args[i]);
  }
  return content;
};

interface TMDBConfig {
  images?: {
    base_url?: string;
    secure_base_url?: string;
    backdrop_sizes?: string[];
    logo_sizes?: string[];
    poster_sizes?: string[];
    profile_sizes?: string[];
    still_sizes?: string[];
  };
  change_keys?: string[];
}

interface TMDBResponse {
  status_code?: number;
  status_message?: string;
  [key: string]: any;
}

interface MovieInfoParams {
  id?: number;
  imdb_id?: string;
  language?: string;
}

interface MovieIdParam {
  id: number | string;
}

interface MovieSimilarParams extends MovieIdParam {
  page?: number;
}

interface MovieCastsParams {
  id: number | string;
}

class TMDB {
  private api_key: string;
  private config: TMDBConfig | null;
  private base: string;
  private api_urls: { [key: string]: string };
  private language: string;

  constructor(api_key: string) {
    this.api_key = api_key;
    this.config = null;
    this.base = "https://api.themoviedb.org/3";
    this.language = "";

    this.api_urls = {
      configuration: `${this.base}/configuration?api_key=${this.api_key}`,
      misc_latest: `${this.base}/movie/latest?api_key=${this.api_key}`,
      misc_upcoming: `${this.base}/movie/upcoming?page={0}&api_key=${this.api_key}`,
      misc_now_playing: `${this.base}/movie/now_playing?page={0}&api_key=${this.api_key}`,
      misc_popular: `${this.base}/movie/popular?page={0}&api_key=${this.api_key}`,
      misc_top_rated: `${this.base}/movie/top-rated?page={0}&api_key=${this.api_key}`,
      movie_info: `${this.base}/movie/{0}?api_key=${this.api_key}`,
      movie_alternative_titles: `${this.base}/movie/{0}/alternative_titles?api_key=${this.api_key}`,
      movie_credits: `${this.base}/movie/{0}/credits?api_key=${this.api_key}`,
      movie_images: `${this.base}/movie/{0}/images?api_key=${this.api_key}`,
      movie_keywords: `${this.base}/movie/{0}/keywords?api_key=${this.api_key}`,
      movie_releases: `${this.base}/movie/{0}/releases?api_key=${this.api_key}`,
      movie_videos: `${this.base}/movie/{0}/videos?api_key=${this.api_key}`,
      movie_translations: `${this.base}/movie/{0}/translations?api_key=${this.api_key}`,
      movie_similar: `${this.base}/movie/{0}/similar?page={1}&api_key=${this.api_key}`,
      person_info: `${this.base}/person/{0}?api_key=${this.api_key}`,
      person_credits: `${this.base}/person/{0}/credits?api_key=${this.api_key}`,
      person_images: `${this.base}/person/{0}/images?api_key=${this.api_key}`,
      collection_info: `${this.base}/collection/{0}?api_key=${this.api_key}`,
      search_movie: `${this.base}/search/movie?query={0}&page={1}&api_key=${this.api_key}`,
      search_person: `${this.base}/search/person?query={0}&page={1}&api_key=${this.api_key}`,
      search_companies: `${this.base}/search/company?query={0}&page={1}&api_key=${this.api_key}`,
      auth_request_token: `${this.base}/authentication/token/new?api_key=${this.api_key}`,
      auth_session_id: `${this.base}/authentication/session/new?request_token={0}&api_key=${this.api_key}`,
      write_rate_movie: `${this.base}/movie/{0}/rating?session_id={1}&api_key=${this.api_key}`,
      company_info: `${this.base}/company/{0}?api_key=${this.api_key}`,
      company_movies: `${this.base}/company/{0}/movies?api_key=${this.api_key}`,
      account_info: `${this.base}/account?session_id={0}&api_key=${this.api_key}`,
      account_add_favorite: `${this.base}/account/{0}/favorite?session_id={1}&api_key=${this.api_key}`,
      account_favorite_movies: `${this.base}/account/{0}/favorite_movies?session_id={1}&api_key=${this.api_key}`,
      account_add_movie_watchlist: `${this.base}/account/{0}/movie_watchlist?session_id={1}&api_key=${this.api_key}`,
      account_movie_watchlist: `${this.base}/account/{0}/movie_watchlist?session_id={1}&api_key=${this.api_key}`,
      account_rated_movies: `${this.base}/account/{0}/rated_movies?session_id={1}&api_key=${this.api_key}`,
      genre_list: `${this.base}/genre/list?api_key=${this.api_key}`,
      genre_movies: `${this.base}/genre/{0}/movies?page={1}&api_key=${this.api_key}`,
    };

    this.configuration().catch((err) => {
      console.error("Error loading configuration:", err);
    });
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  resetLanguage(): void {
    this.language = "";
  }

  private async fetchApi(
    url: string,
    options: RequestInit = {}
  ): Promise<TMDBResponse> {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as TMDBResponse;

    if (data.status_code && data.status_code !== 1 && data.status_code !== 12) {
      throw data;
    }

    return data;
  }

  async configuration(): Promise<TMDBConfig> {
    const url =
      this.api_urls.configuration +
      (this.language ? `&language=${this.language}` : "");
    const config = (await this.fetchApi(url)) as unknown as TMDBConfig;
    this.config = config;
    return config;
  }

  misc = {
    upcoming: async (page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.misc_upcoming.format(page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    latest: async (): Promise<TMDBResponse> => {
      const url =
        this.api_urls.misc_latest +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    nowPlaying: async (page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.misc_now_playing.format(page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    popular: async (page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.misc_popular.format(page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    topRated: async (page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.misc_top_rated.format(page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
  };

  movie = {
    info: async (params: MovieInfoParams): Promise<TMDBResponse> => {
      const id = params.id || params.imdb_id;
      if (!id) {
        throw new Error("Either id or imdb_id must be provided");
      }
      const url =
        this.api_urls.movie_info.format(id) +
        (params.language
          ? `&language=${params.language}`
          : this.language
          ? `&language=${this.language}`
          : "");
      return this.fetchApi(url);
    },
    alternativeTitles: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url =
        this.api_urls.movie_alternative_titles.format(params.id) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    credits: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url = this.api_urls.movie_credits.format(params.id);
      return this.fetchApi(url);
    },
    images: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url = this.api_urls.movie_images.format(params.id);
      return this.fetchApi(url);
    },
    keywords: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url = this.api_urls.movie_keywords.format(params.id);
      return this.fetchApi(url);
    },
    releases: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url = this.api_urls.movie_releases.format(params.id);
      return this.fetchApi(url);
    },
    videos: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url = this.api_urls.movie_videos.format(params.id);
      return this.fetchApi(url);
    },
    translations: async (params: MovieIdParam): Promise<TMDBResponse> => {
      const url = this.api_urls.movie_translations.format(params.id);
      return this.fetchApi(url);
    },
    similar: async (params: MovieSimilarParams): Promise<TMDBResponse> => {
      const url =
        this.api_urls.movie_similar.format(params.id, params.page || 1) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
  };

  search = {
    movie: async (query: string, page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.search_movie.format(query, page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    person: async (query: string, page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.search_person.format(query, page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    companies: async (
      query: string,
      page: number = 1
    ): Promise<TMDBResponse> => {
      const url = this.api_urls.search_companies.format(query, page);
      return this.fetchApi(url);
    },
  };

  person = {
    info: async (id: number): Promise<TMDBResponse> => {
      const url =
        this.api_urls.person_info.format(id) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    credits: async (id: number): Promise<TMDBResponse> => {
      const url =
        this.api_urls.person_credits.format(id) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    images: async (id: number): Promise<TMDBResponse> => {
      const url = this.api_urls.person_images.format(id);
      return this.fetchApi(url);
    },
  };

  collection = {
    info: async (id: number): Promise<TMDBResponse> => {
      const url =
        this.api_urls.collection_info.format(id) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
  };

  auth = {
    requestToken: async (): Promise<TMDBResponse> => {
      return this.fetchApi(this.api_urls.auth_request_token);
    },
    sessionId: async (token: string): Promise<TMDBResponse> => {
      return this.fetchApi(this.api_urls.auth_session_id.format(token));
    },
  };

  company = {
    info: async (id: number): Promise<TMDBResponse> => {
      return this.fetchApi(this.api_urls.company_info.format(id));
    },
    movies: async (id: number): Promise<TMDBResponse> => {
      const url =
        this.api_urls.company_movies.format(id) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
  };

  account = {
    info: async (sid: string): Promise<TMDBResponse> => {
      return this.fetchApi(this.api_urls.account_info.format(sid));
    },
    favorite_movies: async (id: number, sid: string): Promise<TMDBResponse> => {
      return this.fetchApi(
        this.api_urls.account_favorite_movies.format(id, sid)
      );
    },
    rated_movies: async (id: number, sid: string): Promise<TMDBResponse> => {
      return this.fetchApi(this.api_urls.account_rated_movies.format(id, sid));
    },
    add_favorite: async (
      aid: number,
      mid: number,
      sid: string,
      isfavorite: boolean
    ): Promise<TMDBResponse> => {
      const url = this.api_urls.account_add_favorite.format(aid, sid);
      return this.fetchApi(url, {
        method: "POST",
        body: JSON.stringify({ movie_id: mid, favorite: isfavorite }),
      });
    },
    movie_watchlist: async (id: number, sid: string): Promise<TMDBResponse> => {
      return this.fetchApi(
        this.api_urls.account_movie_watchlist.format(id, sid)
      );
    },
    add_movie_watchlist: async (
      aid: number,
      mid: number,
      sid: string,
      isinwatchlist: boolean
    ): Promise<TMDBResponse> => {
      const url = this.api_urls.account_add_movie_watchlist.format(aid, sid);
      return this.fetchApi(url, {
        method: "POST",
        body: JSON.stringify({ movie_id: mid, watchlist: isinwatchlist }),
      });
    },
  };

  write = {
    rateMovie: async (
      id: number,
      sid: string,
      rating: number
    ): Promise<TMDBResponse> => {
      const url = this.api_urls.write_rate_movie.format(id, sid);
      return this.fetchApi(url, {
        method: "POST",
        body: JSON.stringify({ value: rating }),
      });
    },
  };

  genre = {
    list: async (): Promise<TMDBResponse> => {
      const url =
        this.api_urls.genre_list +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
    movies: async (id: number, page: number = 1): Promise<TMDBResponse> => {
      const url =
        this.api_urls.genre_movies.format(id, page) +
        (this.language ? `&language=${this.language}` : "");
      return this.fetchApi(url);
    },
  };
}

export function init(apikey: string): TMDB {
  return new TMDB(apikey);
}
