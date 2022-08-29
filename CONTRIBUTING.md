# Contributing to Husky Photo Editor

Thank you for the interest in contributing to Husky Photo Editor!

There are many ways in which you can contribute, beyond writing code.

## Reporting issues

Have you found an issue? Please check the "Issue" page for this repository to see if someone hasn't already reported the issue. If you couldn't find your issue, create a new issue.

### Find existing issues

If you find your issue already exists, make relevant comments and add your reaction. Use a reaction in place of a "+1" comment:

-   👍 - upvote
-   👎 - downvote

### Writing Good Bug Reports and Feature Requests

File a single issue per problem and feature request. Do not enumerate multiple bugs or feature requests in the same issue.

Do not add your issue as a comment to an existing issue unless it's for the identical input. Many issues look similar but have different causes.

The more information you can provide, the more likely someone will be successful at reproducing the issue and finding a fix.

**You MUST include the following with each issue:**

-   Your operating system

-   Browser name and browser version

-   Reproducible steps (1... 2... 3...) that cause the issue

**You SHOULD include the following with each issue:**

-   What you expected to see, versus what you actually saw

-   Images, animations, or a link to a video showing the issue occurring

-   Errors from the browser's Dev Tools (press F12 or right-click anywhere on the page, then press "Inspect")

## Running project locally

To run the project locally, you need to have the following tools installed:

-   [Git](https://git-scm.com)
-   [Node.js](https://nodejs.org/en)

### Clone repository

First, fork the Husky Photo Editor repository from GitHub (you need to have a GitHub account) so that you can make a pull request. Then, clone your fork locally from the terminal:

`git clone https://github.com/<<<your-github-account>>>/husky-photo-editor.git`

### Run project

From the folder where you cloned the repository, run the following commands:

-   `npm install`
-   `npm run dev`

You should be able to see the app running on `http://localhost:8080`

### Build project

To test the app in production mode, stop the development server, navigate to `next.config.js` file at the root of the project, delete the `disable: true` line from the `pwa` object, and run `npm run build` from the terminal.

## Coding guidelines

### Indentation

Indentation is done using spaces, not tabs. The preferred indentation size is 4 spaces.

### Naming conventions

-   Use PascalCase for `class`, `interface` and `enum` names
-   Use camelCase for `function` names, local variables, methods and properties
-   Don't prefix `interfaces` with "I"
-   Use PascalCase for React functional components (functions in .tsx files)

### Comments

Use JSDoc style comments for `classes`, `interfaces`, `enums` and `functions`

### Strings

Use "double quotes" for strings

### Code style

-   Use arrow functions `=>` over anonymous function expressions
-   Always surround loop and conditional bodies with curly braces:

```JS
// this is correct, but not recommended
for(let i = 0; i < 10; i++)
    if(i > 3)
        console.log(i)

// this is recommended
for(let i = 0; i < 10; i++) {
    if(i > 3) {
        console.log(i)
    }
}

```

## Commit messages

Husky Photo Editor adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) since version 0.4.0, so the commit messages should adhere to the following scheme:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

-   The `type` is mandatory and should be one of the following keywords:
    -   `fix` for a bug fix, coresponding to a `PATCH` increment of the version
    -   `feat` for a new feature, coresponding to a `MINOR` increment of the version
    -   `BREAKING CHANGE` for a breaking change that affects the app in different ways, coresponding to a `MAJOR` increment of the version
    -   `docs` for a code documentation change that does not affect the app functionality, without incrementing the version number
    -   `refactor` for a code change that makes the code more readable, but neither fixes a bug nor adds a feature, coresponding to a `PATCH` increment of the version
-   The `scope` is optional and can be used to indicate what part of the app was affected by the code change (ex. editor, photoCapturing, lang etc.)
-   The `description` is mandatory and should describe the changes made. The `description`:
    -   Should NOT have dot(.) at the end
    -   Should use the present tense ("create", not "created")
-   The `body` is optional and may be used to describe the changes more detailed.
-   The `footer` is optional and should be used only when a BREAKING CHANGE takes place

**Examples**:

-   fix(editor): prevent blank page when changing the language from the browser's address bar
-   feat(lang): add support for French language
