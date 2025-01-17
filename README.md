# TMDB Node.js SDK

[![npm version](https://img.shields.io/npm/v/tmdbv3.svg)](https://www.npmjs.com/package/tmdbv3)
[![npm downloads](https://img.shields.io/npm/dm/tmdbv3.svg)](https://www.npmjs.com/package/tmdbv3)
[![License](https://img.shields.io/npm/l/tmdbv3.svg)](https://github.com/ayhid/node-tmdb-sdk/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://github.com/ayhid/node-tmdb-sdk/actions/workflows/test.yml/badge.svg)](https://github.com/ayhid/node-tmdb-sdk/actions)
[![TMDB API](https://img.shields.io/badge/TMDB%20API-v3-blue.svg)](https://developer.themoviedb.org/docs)

A strongly-typed Node.js SDK for The Movie Database (TMDB) API. This SDK provides easy access to TMDB's extensive movie, TV show, and person data.

> **Note**: This is a complete TypeScript rewrite of the [original tmdbv3 package](https://github.com/raqqa/node-tmdb). While it maintains compatibility with the original API design, the codebase has been entirely modernized with TypeScript, ES Modules, and modern JavaScript practices.

## Features

- 🚀 Full TypeScript support with types generated from TMDB's OpenAPI specification
- 🔍 Comprehensive API coverage for movies, people, companies, and collections
- 📦 Zero dependencies
- ✨ Modern ES Modules support
- 🧪 Fully tested with Vitest

## Installation

```bash
npm install tmdbv3
```

## Usage

First, import and initialize the SDK with your TMDB API key:

```typescript
import { init } from "tmdbv3";

const tmdb = init("your-api-key-here");
```

### Examples

#### Get Movie Information

```typescript
// Get basic movie info
const movie = await tmdb.movie.info(11);
console.log(movie.title); // "Star Wars: Episode IV - A New Hope"

// Get movie credits
const credits = await tmdb.movie.credits(11);
console.log(credits.cast[0].name); // "Mark Hamill"

// Get movie images
const images = await tmdb.movie.images(11);
console.log(images.posters[0].file_path);
```

#### Search Movies and People

```typescript
// Search for movies
const movieResults = await tmdb.search.movies("Star Wars");
console.log(movieResults.results[0].title);

// Search for people
const personResults = await tmdb.search.persons("Elijah Wood");
console.log(personResults.results[0].name);
```

#### Get Person Information

```typescript
// Get person details
const person = await tmdb.person.info(109);
console.log(person.name); // "Elijah Wood"

// Get person's movie credits
const personCredits = await tmdb.person.credits(109);
console.log(personCredits.cast[0].title);
```

## Type Generation

This SDK uses automatically generated TypeScript types from TMDB's official OpenAPI specification. The types are generated using the following process:

1. The `generate-types` script fetches the latest OpenAPI specification from TMDB's documentation.
2. Using `@hey-api/openapi-ts`, it generates TypeScript types that match TMDB's API exactly.
3. The generated types are stored in `src/types/` and are automatically used by the SDK.

To update the types to the latest TMDB API version:

```bash
npm run generate-types
```

## API Reference

### Movies

- `movie.info(id: number)` - Get basic movie information
- `movie.credits(id: number)` - Get movie cast and crew
- `movie.images(id: number)` - Get movie posters and backdrops
- `movie.videos(id: number)` - Get movie trailers and videos
- `movie.keywords(id: number)` - Get movie keywords
- `movie.releases(id: number)` - Get movie release dates
- `movie.translations(id: number)` - Get available translations
- `movie.alternativeTitles(id: number)` - Get alternative titles

### People

- `person.info(id: number)` - Get person information
- `person.credits(id: number)` - Get person's movie credits
- `person.images(id: number)` - Get person's images

### Companies

- `company.info(id: number)` - Get company information
- `company.movies(id: number)` - Get movies from a company

### Collections

- `collection.info(id: number)` - Get collection information

### Search

- `search.movies(query: string)` - Search for movies
- `search.persons(query: string)` - Search for people

### Miscellaneous

- `misc.latest()` - Get the latest movie
- `misc.nowPlaying()` - Get movies in theaters
- `misc.popular()` - Get popular movies
- `misc.topRated()` - Get top rated movies

## Development

### Prerequisites

- Node.js >= 16
- npm >= 7

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```

### Testing

The SDK uses Vitest for testing. Run the test suite:

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [raqqa](https://github.com/raqqa) for creating the original [node-tmdb](https://github.com/raqqa/node-tmdb) package
- The TMDB development community

---

Last updated: January 17, 2025
