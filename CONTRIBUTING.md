# Contributing

## Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/). A commit message should be structured as follows:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Scope

The scope should be the name of the module affected (as perceived by the person reading the changelog generated from commit messages).

### Examples

```
feat(api): add new movie search endpoint
```

```
fix(auth): handle expired tokens properly

The token refresh logic was not properly handling expired tokens,
causing users to be logged out unexpectedly.

Fixes #123
```

```
docs(readme): update installation instructions
```

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable.
2. Update the CHANGELOG.md with notes on your changes.
3. The PR may be merged once you have the sign-off of at least one other developer.

## Release Process

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate version management and package publishing.

The release process is triggered automatically when code is merged into the `main` or `next` branches. The type of release (major, minor, or patch) is determined by the commit messages.
