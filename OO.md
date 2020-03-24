# OO in HTML

The first two exercises are setup in the browser so that you can focus on design
patterns in ES6 JavaScript, instead of focusing on the async issues. The browser
comes with an event loop baked in and so is setup for the turn-taking flow in a
game.

## General process

If you haven't read the top level [README](README.md), more details are there
about each of these point:

1. Find and work with a mentor who has completed this
2. Do TDD, with red/green/refactor PRs (until your mentor frees you for faster)
3. Move tests from acceptance to unit as you extract modules/objects
4. Do it all in one PR, faster and better (when your mentor says you are ready)

## Where and how?

Webpack will compile the scripts is `src` into the `dist` directory. There are
three html pages in `dist` too:

* index.html: A landing page with links to the other two browser exercises
* oo-app.html: The page where the OO app lives with its html and css
* functioal-app.html: The page where the functional app lives with its html and
  css

### JS starting point

An entry point for your OO work in the html page has already been written at
`src/oo-app.js`. It's contents look like this:

```javascript
import Game from './oo-app/Game'

window.addEventListener('DOMContentLoaded', (_event) => {
  const gameDom = document.querySelector('.game')
  new Game(gameDom).run()
})
```

When the page is ready to do its js magic, it finds the dom element where you
will be rendering game DOM, and it passes it to the constructor `Game`. It then
runs the instance. Running is where the magic happens. The features will be
implemented by you after writing tests in the `src/oo-app` directory.

The application you are writing will generate all the markup needed to run the
game, along with event handlers needed to make it all go.

* You can't use any external modules or frameworks
* You can't add anything to the html page directly
* CSS that you change in `dist` is shared by the other exercise too

### The html container

Open the html page in the a browser. There is CSS already there that is ugly,
but functional. You will likely need to add a bit of CSS to make your board look
like a board, and your input form look like an input form, but otherwise don't
stress.

The CSS is shared between both exercises and the landing page, so keep that is
mind and you go around changing it. You can either namespace the CSS for each
exercise, or you can share styles. Currenly all the styles are shared.

Don't add anything to the html page. Your only mechanism for adding markup to
the page should be the js app you are building.

### Don't think about performance, memory or browser compatibility

JS is notorious for having memory leaks related to not removing listeners. Don't
think about it. This is an exercise for learning maintainable, changable code.
We aren't trying to build an actual framework for managing the DOM that can be
reused on extended. So we don't need to worry about those things.

Also browser compatibility is not a worry. This is just an exercise.

### Vanilla JS helpers and advice

It used to be pretty hard to do vanilla JS across browsers, and we needed the
help of jQuery. Now there we can get a lot done with just a few methods on DOM
elements.

#### `innerHTML` attribute

We dependency inject a bit of DOM into the setup class. You need to add your own
markup to that DOM with vanilla JS (yup, even though we are doing OO). Setting
the `innerHTML` attribute on DOM elements will take a string of markup, and
convert it into living DOM elements.

Example:
```javascript
  // replacing the inner contents
  gameDom.innerHTML = `
    <div class="board">
    </div>
  `

  // appending content
  gameDom.innerHTML += '<form></form>'
```

#### `document.createElement` method

Creating DOM from strings is very useful, but it doesn't allow the additon of
event handling before inserting. You can query around in the DOM you create
in order to add event handlers, but depending on your design, it may be easier
to have access to the created elements directly.

Example:
```javascript
  const form = document.createElement('form')
  form.innerHTML = `<input placeholder="Enter your next move" />`
```

#### `addEventListener` method

In order to implement your features, you are going to need to add event handling
to the DOM you have created. You can add events to any element. Keeping things
reasonable for others though means you should put click handlers on the kinds
of symantic elements in the DOM you would expect to be clickable. Likewise for
other elements.

Example:
```javascript
  const form = document.createElement('form')
  form.addEventListener('submit', (event) => {
    console.log(event)
  })
```

#### Querying for DOM elements

Either for testing or for finding elements within your app for implementation,
it is going to be important to easily query your generated DOM. Here are some
helpful methods and links:

* [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
* [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

## Testing

### Libraries

Jest with the rise of React has won as the JS test runner. It comes out of the
box with the ability to mock modules. More on that later, but to avoid that, and
force dependency inversion we are going to use libraries that don't allow that:

* [`mocha`](https://mochajs.org/) - this is the test runner with `describe` etc
* [`jsdom`](https://github.com/jsdom/jsdom) - allowing us to work with DOM
  elements in the Node testing universe
* [`sinon`](https://sinonjs.org/) - a mocking/stubbing framework (use lightly)
* [`assert`](https://nodejs.org/api/assert.html) - the vanilla node assert lib

### Dependency inversion

JavaScript with it's import pattern creates problems for testing when you want
to mock a module. The Jest framework includes some hacks to override nodes
import/export mechanisms in tests. There are other independent libraries that we
could use to mock modules for tests. But what we really want is to force good
dependency inversion practices. So, we are using libraries that don't allow
mocking a whole module.

That means we need to build our code in a way that we can access the
dependencies outside the module, where they are implicitly private. So, we are
going to make them public via dependency injection, two variants:

### 1/ Dependency injection

Passing things directly into a constructor is really useful for things that have
very limited scope:

```javascript
export default class Follow {
  constructor (initiator, recipient) {
    this.initiator = initiator
    this.recipient = recipient
  }

  connect () {
    this.initiator.connect(recipient)
  }
}

// in tests you can pass in things other than the collaborator classes

it ('should connect in one direction', () => {
  const friend1 = {
    connect: sinon.fake()
  }

  const friend2 = {
    connect: sinon.fake()
  }

  new Follow(friend1, friend2).connect()

  assert(friend1.connect.calledWith(friend2))
  assert(!friend2.connect.called())
})

```

### 1/ Dependency inversion via setting

Another dependency injection trick for testing in imported languages is to set
the dependencies in the module in a way that the tests can modify them and the
code can use the modified dependencies. This is typicall done by setting the
dependencies as attributes on the class:

```javascript

import MyMagicClass from `./MyMagicClass`

class MagicMonster {
  perform () {
    new MagicEater.MyMagicClass().cast('hex')
  }
}

MagicMonster.MyMagicClass = MyMagicClass

export default MagicMonster

// Then in tests you can set the dependent class to something different

import MagicMonster from '../lib/MagicMonster'

it('should cast a hex', () => {
  const castMock = sinon.fake()

  class MockMagic {
    cast (type) {
      castMock(type)
    }
  }

  new MagicEater().perform()

  assert(castMock.calledWith('hex'))
})

```

## Design guidelines for OO JS

1. Use ES6 syntax over older variants of JS
2. Everything in `src` where your code should pass
   [`standard`](https://standardjs.com/).
3. Each file in the library should `export default` a class
4. Export dependencies to make them more mockable/testable. See testing section
   above for more details.
4. Methods should be no more that 5 lines long
5. Modules should be less that 100 lines long
6. No more than 4 arguments (including key/value pairs) for any method or
   constructor
6. It's hard to not use local variables in JS, but consider it an exception and
   prefer methods calls where possible.
7. Smells that you may be missing a class/object:
    * Same arguments passed to multiple methods
    * Name your methods well and then note when methods are named the same
    * Pay attention to colors and shapes in your IDE. Things that belong together
      have similar shapes and colors.

## Features

### 1/ Render an empty grid

When you open the html page in a browser ... and more importantly when you run
the game in tests, it renders an empty html grid. There should be column and row
markers on the edges. Here is a ASCII version to guide your work:

```text
   1  2  3
   __ __ __
A |  |  |  |
  |__|__|__|
B |  |  |  |
  |__|__|__|
C |  |  |  |
  |__|__|__|
```

### 2/ Prompt for next move

When you open the page or render the app in the tests, you will see an input
with the placeholder "Enter your coordinates" and a button "Enter". When the
button is clicked, nothing happens. The form shouldn't do the default submit,
and that should be tested.

### 3/ Validate coordinates on click

When you enter coordinatates that are valid and click the button. It prints the
valid coordinates under the input. When you enter invalid coordinates and click
the button, it shows an error message under the input that says "Please enter
valid coordiates".

### 4/ Submitting valid coordinates marks the board with an X

When you enter valid coordinates and submit, the coordinates are no longer
printed under the input. Instead the the board is marked with an 'X'.

If the coordinates are invalid, the error message still is displayed under the
input.

### 5/ Filled in coordinates are invalid

When you enter a coordinate that is already occupied, the error message under
the input says "Choose an empty cell".

Error message for other types of invalid coordinates stays the same. As does the
behavior of filling empty cells with the form.

### 6/ Game fills in a random cell after each player turn

After you enter a valid coordinate filling in a cell, the game will fill in a
random cell with an 'O'.

### 7/ Game status message on filling

The input and button, along with any error message disapear when the board is
filled with 'X' and 'O'.

The are will instead have one of three messages:

* "You won" if the X team got three in a row
* "Computer wins" if the O team got three in a row
* "Draw" if neither is true

### 8/ Game exits early on win

When the X or O player wins, the game ends early showing the message.