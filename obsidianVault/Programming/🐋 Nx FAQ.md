Frequently asked questions about [Nx - Smart, Extensible Build Framework](https://nx.dev/)

## How to show a dependency graph?

```bash
nx dep-graph
```

## How to add a node library?

```bash
nx g @nrwl/node:library domain --directory=backend
```

to be able load a library like

```ts
import {User} from @basic-js-framework/backend/domain
```

you need to adjust `.eslint.rc` file and add in `@nrwl/nx/enforce-module-boundaries` section `["@basic-js-framework/backend/domain"]` to `allow` key 

## How to run two applications (e.g. frontent and backend) at the same time?

```bash
nx run-many --target serve --all --parallel
```

Consider using [proxy functionality](https://nx.dev/l/a/tutorial/06-proxy#angular-nx-tutorial---step-6-proxy)

## Why use NX?

From my perspective:
- eslint, typerscript, jestjs and cypress configured out of the box (what can be especially  challenging for monorepo)
- support beloved tools: React, NextJs, NestJS, ExpressJs, Storybook
- monorepo and shared code done ~~right~~ little better
- tools that helps to keep dependencies under control (eslint rules + dep-graph)

## why do not use NX?
- some tools assume that you can put some resources (e.g. config files) in a root folder what is not a case for NX (e.g. Typeorm CLI and  ormconfig.ts)
- next tools, more to learn, new issues and workarounds
