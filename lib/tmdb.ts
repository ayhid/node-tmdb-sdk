import { paths } from "../src/types/types.gen";

type ApiVersion = "v3" | "v4";

export type TMDBOptions = {
  apiKey?: string;
  accessToken?: string;
  version?: ApiVersion;
  baseURL?: string;
};

type Operations = paths;
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
      this.request("/person/{person_id}", "get", { person_id }),
    credits: (person_id: number) =>
      this.request("/person/{person_id}/movie_credits", "get", { person_id }),
    images: (person_id: number) =>
      this.request("/person/{person_id}/images", "get", { person_id }),
  };

  search = {
    movie: (query: string, page?: number) =>
      this.request("/search/movie", "get", { query, page }),
    person: (query: string, page?: number) =>
      this.request("/search/person", "get", { query, page }),
  };

  company = {
    info: (company_id: number) =>
      this.request("/company/{company_id}", "get", { company_id }),
    movies: (company_id: number) =>
      this.request("/company/{company_id}/movies", "get", { company_id }),
  };

  collection = {
    info: (collection_id: number) =>
      this.request("/collection/{collection_id}", "get", { collection_id }),
  };

  movie = {
    info: (params: { id?: number; imdb_id?: string }) =>
      this.request("/movie/{movie_id}", "get", {
        movie_id: params.id,
        language: this.language,
      }),
    alternativeTitles: (params: { id: number }) =>
      this.request("/movie/{movie_id}/alternative_titles", "get", {
        movie_id: params.id,
      }),
    credits: (params: { id: number }) =>
      this.request("/movie/{movie_id}/credits", "get", { movie_id: params.id }),
    images: (params: { id: number }) =>
      this.request("/movie/{movie_id}/images", "get", { movie_id: params.id }),
    keywords: (params: { id: number }) =>
      this.request("/movie/{movie_id}/keywords", "get", {
        movie_id: params.id,
      }),
    releases: (params: { id: number }) =>
      this.request("/movie/{movie_id}/release_dates", "get", {
        movie_id: params.id,
      }),
    videos: (params: { id: number }) =>
      this.request("/movie/{movie_id}/videos", "get", { movie_id: params.id }),
    translations: (params: { id: number }) =>
      this.request("/movie/{movie_id}/translations", "get", {
        movie_id: params.id,
      }),
  };

  misc = {
    latest: () => this.request("/movie/latest", "get"),
    nowPlaying: () => this.request("/movie/now_playing", "get"),
    popular: () => this.request("/movie/popular", "get"),
    topRated: () => this.request("/movie/top_rated", "get"),
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
    return this.request("/configuration", "get");
  }
}

export function init(apikey: string): TMDB {
  return new TMDB({ apiKey: apikey });
}
