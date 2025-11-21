---
description: Create a major release (breaking change) and push to remote
---

Please perform the following steps to create a major release:

1. Run `pnpm changeset:add major "BREAKING: [describe the breaking change]"` with an appropriate description
2. Run `pnpm release` to build packages, update versions, and create git commit & tag
3. Run `git push origin master --tags` to push the release to remote

When you create the changeset, use a concise description based on recent changes in git history.

⚠️ WARNING: This is a major version update with breaking changes. Make sure you understand the impact.
