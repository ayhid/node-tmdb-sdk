export const mockResponses = {
  configuration: {
    images: {
      base_url: 'http://image.tmdb.org/t/p/',
      secure_base_url: 'https://image.tmdb.org/t/p/',
      backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
      logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
      poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
      profile_sizes: ['w45', 'w185', 'h632', 'original'],
      still_sizes: ['w92', 'w185', 'w300', 'original'],
    },
  },
  person: {
    info: {
      id: 109,
      name: 'Elijah Wood',
      birthday: '1981-01-28',
      place_of_birth: 'Cedar Rapids, Iowa, USA',
      biography: 'Elijah Wood is an actor...',
    },
    credits: {
      id: 109,
      cast: [
        {
          id: 120,
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          character: 'Frodo Baggins',
          release_date: '2001-12-19',
        },
      ],
      crew: [],
    },
    images: {
      id: 109,
      profiles: [
        {
          file_path: '/example-profile.jpg',
          width: 680,
          height: 1000,
        },
      ],
    },
  },
  search: {
    movie: {
      page: 1,
      results: [
        {
          id: 11,
          title: 'Star Wars',
          release_date: '1977-05-25',
        },
      ],
      total_results: 100,
      total_pages: 5,
    },
    moviePage4: {
      page: 4,
      results: [
        {
          id: 12,
          title: 'Another Movie',
          release_date: '2020-01-01',
        },
      ],
      total_results: 100,
      total_pages: 5,
    },
    person: {
      page: 1,
      results: [
        {
          id: 109,
          name: 'Elijah Wood',
          known_for: [
            {
              id: 120,
              title: 'The Lord of the Rings',
              media_type: 'movie',
            },
          ],
        },
      ],
      total_results: 50,
      total_pages: 3,
    },
  },
  company: {
    info: {
      id: 1,
      name: 'Lucasfilm',
      description: 'Lucasfilm is a film production company...',
      headquarters: 'San Francisco, California',
      parent_company: 'The Walt Disney Company',
    },
    movies: {
      id: 1,
      results: [
        {
          id: 11,
          title: 'Star Wars',
          release_date: '1977-05-25',
        },
      ],
      total_results: 100,
      total_pages: 5,
    },
  },
  collection: {
    info: {
      id: 10,
      name: 'Star Wars Collection',
      overview: 'The Star Wars Collection includes all movies...',
      poster_path: '/example-collection-poster.jpg',
      backdrop_path: '/example-collection-backdrop.jpg',
      parts: [
        {
          id: 11,
          title: 'Star Wars: Episode IV - A New Hope',
          release_date: '1977-05-25',
        },
      ],
    },
  },
  movie: {
    info: {
      id: 11,
      title: 'Star Wars: Episode IV - A New Hope',
      original_title: 'Star Wars',
      release_date: '1977-05-25',
    },
    infoFr: {
      id: 11,
      title: 'Star Wars : Épisode IV - Un nouvel espoir',
      original_title: 'Star Wars',
      release_date: '1977-05-25',
    },
    alternativeTitles: {
      id: 11,
      titles: [
        {
          iso_3166_1: 'BR',
          title: 'Guerra nas Estrelas',
        },
      ],
    },
    credits: {
      id: 11,
      cast: [
        {
          id: 2,
          name: 'Mark Hamill',
          character: 'Luke Skywalker',
        },
      ],
      crew: [
        {
          id: 1,
          name: 'George Lucas',
          job: 'Director',
        },
      ],
    },
    images: {
      id: 11,
      backdrops: [
        {
          file_path: '/example-backdrop.jpg',
          width: 1920,
          height: 1080,
        },
      ],
      posters: [
        {
          file_path: '/example-poster.jpg',
          width: 680,
          height: 1000,
        },
      ],
    },
    keywords: {
      id: 11,
      keywords: [
        {
          id: 1,
          name: 'space opera',
        },
      ],
    },
    releases: {
      id: 11,
      countries: [
        {
          iso_3166_1: 'US',
          certification: 'PG',
          release_date: '1977-05-25',
        },
      ],
    },
    videos: {
      id: 11,
      results: [
        {
          id: '123',
          key: 'example-youtube-id',
          name: 'Official Trailer',
          site: 'YouTube',
          type: 'Trailer',
        },
      ],
    },
    translations: {
      id: 11,
      translations: [
        {
          iso_639_1: 'fr',
          name: 'Français',
          english_name: 'French',
        },
      ],
    },
  },
  misc: {
    latest: {
      id: 1234,
      title: 'Latest Movie',
      release_date: '2024-01-17',
    },
    nowPlaying: {
      page: 1,
      results: [
        {
          id: 1235,
          title: 'Now Playing Movie',
          release_date: '2024-01-10',
        },
      ],
      total_results: 100,
      total_pages: 5,
    },
    popular: {
      page: 1,
      results: [
        {
          id: 1236,
          title: 'Popular Movie',
          vote_average: 8.5,
        },
      ],
      total_results: 100,
      total_pages: 5,
    },
    topRated: {
      page: 1,
      results: [
        {
          id: 1237,
          title: 'Top Rated Movie',
          vote_average: 9.2,
        },
      ],
      total_results: 100,
      total_pages: 5,
    },
  },
};
