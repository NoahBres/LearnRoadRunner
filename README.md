# LearnRoadRunner

An opinionated guide and documentation for Road Runner

## Notes:

- `package.json` requires a downgrade to `watchpack` because later updates break live reloading.
  - https://github.com/vuejs/vuepress/issues/2392#issuecomment-638548192
- `package.json` requires a set version for `vue`, `vue-template-compiler`, and `vue-server-renderer` because not setting all three of these to the same versions leaves them out of sync for some reason
- `package.json` requires a set version for uplot because `uplot@1.1.1` has a bug that freezes the entire page on plot initialization

## TODO:

- details on async following
- details on each heading interpolator
- explanation of continuity exceptions
- check the come back sections

- Fix the default mobile breakpoints

- go back and add the you are here images

- make a resources section with the papers ryan linked in the original docs

- add a tools section with like david's visualizer and stuff

- add alt tags to images

- improve lighthouse scores

- support fancy image/video formats

- yell at user if they use I or D in velo pid

- insert gifs from MeepMeep as examples in trajectories

- remove underline in the trajectories page

- go back and fix everything in safari because safari sucks

- fix firefox too
