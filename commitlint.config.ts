import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: "conventional-changelog-atom",
    formatter: "@commitlint/format",
    rules: {
      "type-enum": [
        RuleConfigSeverity.Error,
        "always",
        [
          "feat",     // New features
          "fix",      // Bug fixes
          "chore",    // Maintenance tasks
          "docs",     // Documentation changes
          "style",    // Code style/formatting changes
          "refactor", // Refactoring without feature/bug changes
          "perf",     // Performance enhancements
          "test",     // Adding or modifying tests
          "build",    // Build system changes
          "ci",       // Continuous Integration changes
          "revert",   // Reverting previous commits
        ],
      ],
      // TODO: add rule to enforce jira ticket number in commit message 
    },
  };
  
  export default Configuration;
  