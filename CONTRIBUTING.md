# Contributing

Thanks for taking the time to contribute to this projects.

## What to contribute

- **New notation scripts** (new notation + its milestones/analysis)
- **Improvements** to an existing notation (better expansions, correctness fixes)
- **Performance optimizations** (while preserving correctness)
- **Bug fixes** and **consistency** fixes across the codebase
- **Documentation** improvements

## Before you start

1. Pick the notation (or file) you want to improve.
2. Read the existing notation patterns and ensure your change follows the repo rules (see *Rules* below).
3. If you’re unsure whether a change is appropriate, open an **Issue** first.

## Reporting issues

Open an issue with:

- What you expected to happen
- What actually happened
- The relevant notation name / file
- Minimal reproduction steps (or the smallest failing example)
- (If applicable) a short log/output snippet

## Proposing changes (Pull Requests)

Open a pull request with:

- A clear title describing the notation/functionality being changed
- A description of what changed and why
- Evidence of correctness (see *Testing expectations* below)

### Pull requests checklist (required)

- [ ] The change follows the repo **coding + formatting rules** (check `README.md/Rules`)
  - [ ] No recursion is introduced
  - [ ] Expansions mutate `ord` as required
  - [ ] Performance is not catastrophically worse (and ideally improves)
- [ ] Any new notation includes/updates milestones analysis (no analysis is better than wrong analysis)
- [ ] Quick manual verification is done (expand + unparse behave as intended)

## Testing expectations

- Ensure expansions are correct for the notation’s intended domain
- If you add or change behavior, update/verify the associated test log
- If the repo provides an existing runner, validate using the project’s current workflow

## License

By contributing, you agree that your contributions will be licensed under the project license (see repository LICENSE file).
