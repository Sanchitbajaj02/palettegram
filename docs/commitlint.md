# Commitlint Guidelines

You may wonder, what this is 🤔? Commit Lint is a tooling which is implemented so that you can write meaningful commit message.

A meaningful message help the code reviewers, to know what you have commit along with the `tag` in which your commit lies in. Here are the tags that are configured in this project:

## Formats configured

- **build**: Changes which affect CI configuration files and scripts

- **chore**: Changes which aren't user-facing

- **docs**: Changes which affect documentation

- **feat**: Changes which introduce a new feature or improve a feature

- **fix**: Changes which patches a bug

- **perf**: Changes which improve performance

- **refactor**: Changes which neither fix a bug nor add a feature

- **revert**: Changes which revert a previous commit

- **style**: Changes which don't affect code logic, such as white-spaces, formatting, missing semi-colons

- **test**: Changes which add missing tests or correct existing tests

## Examples

```bash
git commit -m  "feat: new feature added into the system"
# or
git commit -m "perf: performance improved by 20%"
```