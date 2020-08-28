# LearnRoadRunner

An opinionated guide and documentation for Road Runner

## Notes:

- `package.json` requires a downgrade to `watchpack` because later updates break live reloading.
  - https://github.com/vuejs/vuepress/issues/2392#issuecomment-638548192
- `package.json` requires a set version for `vue`, `vue-template-compiler`, and `vue-server-renderer` because not setting all three of these to the same versions leaves them out of sync for some reason
- `package.json` requires a set version for uplot because `uplot@1.1.1` has a bug that freezes the entire page on plot initialization

## TODO:

- Finish overloading constraints section

- Finish gain scheduling section

- write about interrupting live trajectories

- support fancy image/video formats (webm, webp, etc)

- yell at user if they use I or D in velo pid

- remove underline in the trajectories page

- go back and fix everything in safari because safari sucks

- fix firefox too

- optimize for cumulative layout shift
