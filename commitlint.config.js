const conventionalCommit = require("./.github/conventionalCommit.json");

const typesEnum = Object.keys(conventionalCommit.types);

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", typesEnum],
    "scope-case": [2, "always", ["camel-case"]],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", ["lower-case"]],
  },
};
