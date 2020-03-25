# Async on the command line

In this exercise, we are diving deeply into the asynchronous nature of
JavaScript with a command line application. In Node the `stdin` and `stdout`
objects are event streams.

## Async challenges and resources

### Know your streams

Here are some good docs:

* https://nodejs.org/api/process.html#process_process_stdout
* https://nodejs.org/api/process.html#process_process_stdin
* https://nodejs.org/api/stream.html#stream_stream
* https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
* https://nodejs.org/api/stream.html#stream_readable_read_size

### Control flow in async land

By default, nothing streams do is blocking or syncronous. That means that we
need to have control flow mechanisms that can wait for our IO to finish.

#### Callbacks

The default mechanism for writing to a stream is to pass it a callback that
gets called when the write is complete.

```javascript
const callback = process.exit
process.stdout.write('Hello world', callback)
```

In this case, after we write to stdout, we exit the application. We need this
kind of flow not just in the application to wait for async output, but also to
know in tests when async work is complete and it is possible to run tests.

#### Promises

The `util` module in node allows the conversion of these conventional callback
functions into [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Promises are easier to reason about since they allow us to think more
synchronously about async flows. Although creating them is a bit of a
mindbender.

Here is an example of how to write a function that wraps a stream write function
in a Promise, handling it correctly.

We need to inject the stream object instead of calling `process.stdout` directly
so that we can use the injected object for testing!

```javascript

const createLogger = (stream) => (content) => {
  return new Promise((resolve, reject) => {
    stream.write(content, (error) => {
      if (error) { reject(error) }

      resolve()
    })
  })
}

const log = createLogger(process.stdout)

log('Hello world').then(process.exit)

```

#### async/await

The latest iteration of async control flow is with the pair, [`async` and
`await`](https://javascript.info/async-await). This is a layer of abstraction
that sits on top of a promise.

The `async` keyword prefaces any function that returns a promise. It is a
indicator to the interpreter that this function will return a promise.

The `await` keyword is applied when you want to wait for the resolved value of
the promise.

Using `await` makes for easier to read code, but writing a proper `async`
function is also a bit challenging.

```javascript

const createLogger = (stream) => async (content) => {
  return new Promise((resolve, reject) => {
    stream.write(content, (error) => {
      if (error) { reject(error) }

      resolve()
    })
  })
}

const stdoutLogger = createLogger(process.stdout)
const awaitingLog = async (content) => { await stdoutLogger(content) }

awaitingLog('Hello from awaited async land\n')
console.log('This should always happen after!')

```

One of the gotchas around async/await is that uncaught errors will percolate up.
With promises, we can `catch` errors. So, async functions should either `catch`
in the place it is `await`ing, or be in a try/catch block.

#### Which control flow to choose?

It's up to you. They all have tradeoffs. The goal is maintainable, changeable
code. To that end, you should choose one flow so that there isn't a congnative
load around changing abstractions.

### ES6 modules and Node

using `import` and `export` vs the original Node `require` and `exports` is
experimental in the latest versions of Node.

I tried a number of ways to get ES6 in our node, and the best approach that I
found was to use the `.mjs` extension, and require files with the the extension.

```javascript
// filename: index.mjs
import Stuff from './stuff.mjs'
```

### Running the app

Because the async work is for the node environment. Compiling it to browser js
and using it won't work. So, we have to run it from the `src` directory!

```sh
node src/async-app.mjs
```

## Features

1. When you run ruby `tic_tac_toe/game_runner.rb`, an empty grid is rendered on
   the screen.
```
   __ __ __
  |  |  |  |
  |__|__|__|
  |  |  |  |
  |__|__|__|
  |  |  |  |
  |__|__|__|
```
2. When you render the grid there are numbers above each column and letters to
   the left of each row that can be used to identify to tell the program where
   to put the next mark.
```
   1  2  3
   __ __ __
A |  |  |  |
  |__|__|__|
B |  |  |  |
  |__|__|__|
C |  |  |  |
  |__|__|__|
```
3. The app waits for user input after rendering the screen with a prompt asking
   for coordinates. When the user enters a good coordinate the app quits. When
   the user enters bad coordinates, the application returns a message about not
   understanding the message, then waits for good input. The application doesn’t
   quit until the user enters good information. Coordinates are a row letter
   combined with a column number, for example: `A2`, `B3`.
4. Given the app renders an empty board and then waits for good input, we want
   to continue with that flow, but instead of quitting on good input, it renders
   the board with an X inside the box. After that it quits.
```
   1  2  3
   __ __ __
A |  |  |  |
  |__|__|__|
B |  |  |  |
  |__|__|__|
C |  |  |  |
  |__|__|__|

Enter your move > B2

   1  2  3
   __ __ __
A |  |  |  |
  |__|__|__|
B |  |X |  |
  |__|__|__|
C |  |  |  |
  |__|__|__|
```
5. The computer player enters the next move. It will put an O in a random
   location not chosen by the user. Then it re-renders the board and quits.
6. The game goes back and forth between waiting for user input and automatically
   filling a square until all the board is filled in, regardless of a win. The
   game quits after the board is full. Coordinates with a mark in them already
   are not valid entries.
7. The game exits early if someone wins. The exiting message indicates which
   player won.
