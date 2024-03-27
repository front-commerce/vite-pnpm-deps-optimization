## Problem with Dependency Optimization in pnpm

### Issue Overview

There seems to be an issue with the optimization of the `object-path` package when using `pnpm` as the package manager, specifically in a polyrepo setup. This problem does not occur when using `npm`, indicating a potential discrepancy in how dependencies are handled between these package managers.

### Steps to Reproduce

To observe the issue, follow these steps:

1. Navigate to the polyrepo directory using `cd polyrepo`.
2. Execute the command `pnpm run dev:pnpm`.
3. Upon opening the landing page, the following error is encountered:
   ```
   Uncaught SyntaxError: The requested module '/node_modules/.pnpm/object-path@0.11.8/node_modules/object-path/index.js?v=41e44650' does not provide an export named 'default' (at hello.tsx:2:8)
   ```

### Expected Behavior with npm

For comparison, performing similar steps with `npm` does not result in this error:

1. In the polyrepo directory, run `npm run dev:npm`.
2. The landing page loads correctly, displaying the data without any issues.

### Additional Context

Interestingly, when in a monorepo setup, the `object-path` package is optimized correctly using `pnpm`. For example:

- Navigate to `monorepo/app` folder.
- Run `pnpm i` followed by `pnpm run dev`.
- The landing page loads correctly, displaying the data as expected.

Additionally, the build process completes successfully on both package managers, which can be verified by running `pnpm run build:pnpm` and `npm run build:npm`, and then starting with the preview script.

This indicates that the issue might be specific to the development environment in polyrepo setups when using `pnpm`.
