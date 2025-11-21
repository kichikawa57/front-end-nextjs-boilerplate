---
description: Create a patch release (bugfix) and push to remote
---

Please perform the following steps to create a patch release:

1. Run `pnpm changeset:add patch "Fix: [describe the fix]"` with an appropriate description
2. Run `pnpm release` to build packages, update versions, and create git commit & tag
3. Run `git push origin master --tags` to push the release to remote

When you create the changeset, use a concise description based on recent changes in git history.
