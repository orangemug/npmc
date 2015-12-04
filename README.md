# npmc
Check out the size of all your dependencies before/after minification

> Check-ch-check-check-check-ch-check it out 
> What-wha-what-what-what's it all about 
> Work-wa-work-work-work-wa-work it out 
> Let's turn this into a nice maintained code base of node_modules... wait what...

[![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)][stability]
[![circleci](https://circleci.com/gh/orangemug/npmc.png?style=shield)][circleci]
[![Dependency Status](https://david-dm.org/orangemug/npmc.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/npmc/dev-status.svg)][dm-dev]

[stability]: https://github.com/orangemug/stability-badges#unstable
[circleci]:  https://circleci.com/gh/orangemug/npmc
[dm-prod]:   https://david-dm.org/orangemug/npmc
[dm-dev]:    https://david-dm.org/orangemug/npmc#info=devDependencies


## Usage
To use it just run

    npmc /path/to/package.json

**NOTE** It assumes the modules are installed in the `node_modules` directory alongside the `package.json`

The output will look something like this

    $ npmc node_modules/chalk/package.json 
    [processing] ansi-styles
    [processing] escape-string-regexp
    [processing] has-ansi
    [processing] strip-ansi
    [processing] supports-color
    [processed]  ansi-styles
    [processed]  escape-string-regexp
    [processed]  supports-color
    [processed]  strip-ansi
    [processed]  has-ansi

    ansi-styles (^2.1.0)
      full: 1.75 kB, 69 lines, 1752 chars
      minify: 1.2 kB, 1 lines, 1197 chars

    escape-string-regexp (^1.0.2)
      full: 725 B, 15 lines, 725 chars
      minify: 626 B, 1 lines, 626 chars

    has-ansi (^2.0.0)
      full: 843 B, 14 lines, 843 chars
      minify: 714 B, 1 lines, 714 chars

    strip-ansi (^3.0.0)
      full: 852 B, 16 lines, 852 chars
      minify: 732 B, 1 lines, 732 chars

    supports-color (^2.0.0)
      full: 3.57 kB, 149 lines, 3566 chars
      minify: 1.92 kB, 1 lines, 1920 chars


## License
[MIT](LICENSE)
