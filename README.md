# LearnRoadRunner

An opinionated guide and documentation for Road Runner

## Contributors ❤️

Big thanks to all of LearnRoadRunner's contributors:

<a href="https://github.com/NoahBres/LearnRoadRunner/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=NoahBres/LearnRoadRunner" />
</a>

## Notes:

- `package.json` requires a downgrade to `watchpack` because later updates break live reloading.
  - https://github.com/vuejs/vuepress/issues/2392#issuecomment-638548192

## TODO:

- Finish overloading constraints section

- Finish gain scheduling section

- support fancy image/video formats (webm, webp, etc)

- remove underline in the trajectories page

- optimize for cumulative layout shift

## Running Learn Road Runner locally

As Learn Road Runner is written for a now legacy version of Road Runner, it will not remain online forever. That being said, its important to not lose the information on Learn Road Runner, so here are insturctions for running the site locally, for those that need it.

 1. Make sure you have node.js installed. I used [nvm windows](https://github.com/coreybutler/nvm-windows), but if you have an OS with bash, feel free to use [nvm](https://github.com/nvm-sh/nvm) if you have a Unix or macOS system, or use WSL. As of writing, these directions work with node 21.6.1.

 2. Once nvm is installed, run `nvm install 21.6.1` in your command line, and let it install.

 3. Now, run `nvm use 21.6.1`

 4. Clone this project from github and navigate to this project's root in your command line

 5. run `npm insall` from the root of the project folder
 
 6. use legacy openssl
   - for Linux, macOS, or WSL run `export NODE_OPTIONS=--openssl-legacy-provider`
   - for Windows command prompt run `set NODE_OPTIONS=--openssl-legacy-provider`
   - for Windows powershell run `$env:NODE_OPTIONS = "--openssl-legacy-provider"`
 
 7. run `npm run dev` to run the site. Once the client is done building, you can open 'localhost:8080' in your browser to access it.

