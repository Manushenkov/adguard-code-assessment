## Code assessment for Adguard

### Getting started
Always use node version 20

I've tested on macos and ubuntu 20, windows is unknown

Install local dependencies by running:

```bash
npm i
```

### Development
Watch for changes and quickly recompile the code
```bash
npm run dev
```

To debug the extension in the chrome browser, use the "load unpacked" button under chrome://extensions/ in development mode, and select the `dist` folder.

When developing background page/service worker, you need to reload the extension in chrome://extensions/ using the appropirate button

When developing popup, it's enough to close and reopen it

Create production build
```bash
npm run build
```

Run linter
```bash
npm run lint
npm run lint:fix
```

Run tests locally
```bash
npm run test
```

### Contributing
After creating a PR request, tests and linters are run automatically in github