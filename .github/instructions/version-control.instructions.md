# Version Control Instructions

Git is the version-control system used for this project.

Follow the rules below when a user prompts you to complete a task related to version control.

## Copilot Capabilities

You are allowed to carry out ONLY the following two actions:

1. Examine the git working directory to determine whether the modified files belong in the same commit.
2. Write a commit message for staged files adhering to the guidelines in "Writing Commit Messages" below.

### Allowed Commands

Copilot may always run the following commands without asking for permission:

- **git status --short**\
List files that are in the working directory as well as files that are staged for commit.

- **git diff --name-only**\
List files in the working diretory that have unstaged changes.

- **git diff --staged --name-only**\
List files that are staged for commit.

### Prohibited Commands

Copilot is NEVER allowed to modify the index nor run the following commands regardless of user permission:

- **git add [file]**\
NEVER stage a file for commit.

- **git commit -m "[message]"**\
NEVER create a commit.

- **git restore [file]**\
NEVER discard changes in the working directory.

- **git reset [file]**\
NEVER unstage a file.

- **git push**\
NEVER push commits to a remote repository.

- **git pull**\
NEVER pull changes from a remote repository.


- Always examine the diffs of staged files to get context for commit messages
  - List staged files by executing `git diff --cached --name-only`
  - View file diffs, run `git diff --cached`
- If there are no staged files:
  - Do not write a commit message
  - Inform the user, "There are not staged files"

## Writing Commit Messages

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) structure including:

1. Use the imperative mood -- the message should complete the sentence: "If applied, this commit will __"
2. Insert a blank line between the subject and the body
3. Limit the subject to a maximum of 50 characters
4. Wrap the body lines at approximately 72 characters
5. Use Conventional Commit prefixes (e.g., `feat:`, `fix:`, `docs:`, `refactor`, `revert`)

Carry out the following steps when prompted to write a commit message:

1. Check for staged files: run `git diff --staged --name-only`
2. If there are no staged files:
   - Do not write a commit message
   - Inform the user, "There are not staged files"

If there are staged files:

1. Run `git diff --staged` to examine the diffs and get context for commit messages
2. Based on the file diffs, infer the message's structural elements including:
   - Prefix
   - Optional scope
   - Body
   - Footer
3. Output the commit message inside the chat panel for the user to preview prior to commit

### Example Message Structure

```
feat(auth): add OAuth2 provider for Google logins

Implement the Google-specific strategy within the passport middleware.
This allows users to authenticate using their corporate accounts.

Fixes: #102
```

## References

[Git documentation](https://git-scm.com/docs "Official Git docs")
