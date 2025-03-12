# Jackpot Frontend 

This is a Frontend monorepository for the Jackpot team


We use `pnpm` as our package manager. Ensure you have it installed to manage dependencies efficiently.

The project specifies a required Node.js version in the `.nvmrc` file. Make sure to use the correct Node.js version by running:

```sh
nvm use
```
## Install pnpm

To install `pnpm`, you can follow the instructions on the [pnpm GitHub repository](https://github.com/pnpm/pnpm). The simplest way to install it is using `npm`:

```sh
npm install -g pnpm
```

## Install Dependencies

Once you have `pnpm` installed, you can install the project dependencies by running:

```sh
pnpm install --frozen-lockfile
```


## Run project

To run the dev server for your app, use:

```sh
pnpm dlx nx serve widget
```

To create a production bundle:

```sh
pnpm dlx nx build widget
```

To see all available targets to run for a project, run:

```sh
pnpm dlx nx show project widget
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
pnpm dlx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
pnpm dlx nx g @nx/react:lib mylib
```

You can use `pnpm dlx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.


## Commit Rules and Checks

We follow a strict commit message convention to ensure consistent and meaningful commit history. Our commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Here is an example of a valid commit message:

```
feat(widget): add new feature to widget component
```

_Note_: In the future, we will implement a rule to enforce including a Jira ticket reference in every commit message.

We have a pre-commit hook set up to enforce these rules. The hook will automatically check your commit messages and run linting and type checking before allowing the commit. If any of these checks fail, the commit will be rejected.

To bypass the pre-commit hook (not recommended), you can use the `--no-verify` flag:

```sh
git commit --no-verify
```

