# JS Tic-Tac-Toe

This is a 3-in-1 set of exercises for doing tic-tac-toe in JS.

1. OO in html
2. Functional in html
3. Command-line app with fully owned asynchronous IO

## Background

Recently, we put together
[an exercise](https://github.com/thoughtbot/oo-tic-tac-toe) in Ruby for OO
programming.

JavaScript is a wilder beast than Ruby, with ew of the hard and fast conventions
of Ruby. You can do OO, functional or procedural programming. While procedural
programming is the gateway to pain and sorrow, **getting comfortable with OO
and functional paradigms in JS is a fundamental**.

JavaScript is also unlike Ruby in that it is asynchronous by nature. In the
browser, JS operates in an invisible event loop, running code linearly until
it's done, then waiting for an event to trigger more code behavior. On the
server in Node.js, asynchronicity becomes a first class citizen. Most standard
libraries call the IO with a command and a callback. Over the years of callback
misery, promises and async/await have cropped up to make asynchronous behavior
easier to reason about.

Getting fluent in asynchronous behavior is important for JS, but it is a general
fundamental separate from JavaScript. It can be applied to many things including
data pipelines, background jobs and debugging of race conditions.

## The exercises

Each of the exercises has its own README with rules and instructions:

1. [OO in html](OO.md)
2. [Functional in html](FUNCTIONAL.md)
3. [Async Command-line app](ASYNC.md)

## General process

### 0/ Do them in order, or at least to the last one last

The last exercises allows you to choose between OO and functional at every step,
and you will have to justify why you took that option at each step. So, make
sure you nail the first two exercises well enough to understand best practices
and trade offs.

### 1/ Find a mentor

You want to work with someone who has already done this exercise and gotten PR
by PR feedback. Don't skip ahead to see their work, because everyone comes up
with their own beautiful inventions.

### 2/ Do strict TDD - with red, green, refactor

For the first two features (at least). Do a separate PR for:

* Red: the failing tests
* Green: the bare minimum needed to make the test past (stupidly)
* Refactor: making the code pretty, and following the design rules

Do a PR for each of these, and to avoid pain, wait for feedback before moving to
the next step.

### 3/ Test to the pyramid, extract code to get there

This exercise starts out with just a passing high level acceptance test. As the
code follows the design guidelines, more modules and classes will be extracted.
Each of these should be easy to test, and instead of adding more high level
tests, you should be moving detailed logic out of those tests and into unit and
integrational tests.

### 4/ More, better, faster

After a 2+ features separating out red-green-refator into separate PRs, its time
to start doing them all in one PR.

## Tests

Tests can be run by the script `npm test` or `yarn test` depending on your
peferred tool.