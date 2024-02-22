# AnnotAid - APP

AnnotAid is an Electron application for annotating histopathology images. It is designed to be simple and intuitive, while providing advanced AI precision. The application is built using [React](https://reactjs.org/), [Electron Vite](https://electron-vite.org/), and [OpenSeadragon](https://openseadragon.github.io/) with [Annotorious](https://annotorious.github.io/).

## Project Structure

```md
.
├── patches/                          # Patch files for OpenSeadragon and Annotorious
├── dist/                             # Build output
├── resources/                        # Application resources
├── src/
│   ├── common/                       # Shared code between main and renderer
│   │   ├── constants/                # Constants
│   │   ├── types/                    # Types
│   │   ├── utils/                    # Utilities
│   │   └── ...
│   ├── java/                         # AnnotAid Java Image Reader Server
│   ├── main/                         # Electron main process
│   │   ├── core/                     # Core modules
│   │   └── ...
│   ├── preload/                      # Electron preload scripts
│   ├── renderer/                     # Electron renderer process
│   │   ├── src/
│   │   │   ├── adapters/             # Adapters for external libraries
│   │   │   ├── apollo/               # Apollo Client
│   │   │   ├── assets/               # Assets
│   │   │   ├── components/           # Large Components
│   │   │   ├── dialogs/              # Dialog components
│   │   │   ├── handlers/             # Handler classes
│   │   │   ├── hooks/                # Custom hooks
│   │   │   ├── i18n/                 # Internationalization
│   │   │   ├── icons/                # Custom icons
│   │   │   ├── layouts/              # Layout components
│   │   │   ├── lib/                  # Plugins for OpenSeadragon
│   │   │   ├── menus/                # Menu components
│   │   │   ├── pages/                # Main pages
│   │   │   ├── popovers/             # Popover components
│   │   │   ├── services/             # Service classes
│   │   │   ├── schemas/              # Form schemas in Zod
│   │   │   ├── store/                # Zustand stores
│   │   │   ├── styles/               # Stitches Theme and global styles
│   │   │   ├── tools/                # Custom tools for Annotorious
│   │   │   ├── ui/                   # Small Components
|   │   │   └── ...
│   │   └── ...
│   └── ...
├── .env                              # Development environment variables
├── .env.example                      # Example template of environment variables
├── .env.production                   # Production environment variables
├── electron.vite.config.ts            # Vite configuration for Electron
├── electron-builder.yml              # Electron Builder configuration
├── package.json                      # Project manifest
└── ...
```

## ‼️ Important Note

**❌ Do not modify the [`src/java`](./src/java) directory directly.** It is a submodule of the [AnnotAid Reader](https://github.com/histopathology-image-annotation-tool/annotaid-reader) repository. If you need to modify the Java server, **you need to clone the repository and make changes there**.

If you make changes to the Java server, you need to run the following commands to update the submodule:

```bash
yarn git:submodule:update
```

This will update the submodule to the latest commit of the [AnnotAid Reader](https://github.com/histopathology-image-annotation-tool/annotaid-reader) repository.

## ⚙️ Environment variables

Before running, you need to create `.env` or `.env.production` file in the root directory and copy the content of the `.env.example` file. Then, you need to fill the following environment variables:

- `MAIN_VITE_HAZEL_SERVER_URL` - The URL of the Hazel server.
- `MAIN_VITE_AUTH_STORAGE_NAME` - The name of the storage for the authentication tokens.
- `MAIN_VITE_AUTH_STORAGE_ENCRYPTION_KEY` - The encryption key for the authentication tokens. It should be a 32-character string.
- `RENDERER_VITE_API_URI` - The URL of the GraphQL API server.
- `RENDERER_VITE_SERVICE_URI` - The URL of the Image Reader server.
- `RENDERER_VITE_AI_URI` - The URL of the AI server.
- `RENDERER_VITE_SMARTLOOK_KEY` - The Smartlook key for the analytics.

Your project structure should look like this:

```md
.
├── ...
├── src/
├── package.json
├── .env                                       # Your .env file for development
├── .env.production                            # Your .env.production file for production
├── .env.example
├── ...
```

## 🛠️ How to install

To install all required packages, you need to run the following command:

```bash
yarn
```

In some cases, you need to patch packages:

```bash
npx patch-package
```

If your [`src/java`](./src/java) directory is empty, you need to run the following commands:

```bash
yarn git:submodule:recurse
yarn git:submodule:update
```

## 🚀 How to run

To run the application in development mode, you need to run the following command:

```bash
yarn dev
```

## 📦 How to build

To build the application, you need to run the following command:

```bash
# For Windows
yarn build:win

# For MacOS (ARM)
yarn build:mac-arm

# For MacOS (Intel)
yarn build:mac-intel
```

**Note:** Output files will be located in the [`dist`](/dist) directory.

## License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/histopathology-image-annotation-tool/hiat-app">AnnotAid</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/PeterSkriba">Peter Škríba</a> is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution-NonCommercial-ShareAlike 4.0 International<img alt="CC" style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img alt="BY" style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img alt="NC" style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img alt="SA" style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>
