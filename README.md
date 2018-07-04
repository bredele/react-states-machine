# React State Machine

[![NPM](https://img.shields.io/npm/v/react-states-machine.svg?style=flat-square)](https://www.npmjs.com/package/react-states-machine)
[![Downloads](https://img.shields.io/npm/dm/react-states-machine.svg?style=flat-square)](http://npm-stat.com/charts.html?package=react-states-machine)
[![pledge](https://bredele.github.io/contributing-guide/community-pledge.svg)](https://github.com/bredele/contributing-guide/blob/master/community.md)

Architecture your [React](https://reactjs.org/) components the right way using a simple and elegant finite state machine.

## Usage

```js
import machine from 'react-states-machine'

// describe flow using state machine
function Flow () {
  return (
    <div>
      {machine({
        // welcome state
        'welcome': [
          props => <button onClick={() => props.transition('click')}>Welcome</button>,
          {
            // transition to next on 'click' event
            'click': [() => ({message: 'Hello you!'}), 'next']
          }
        ],
        // next state
        'next': [
          props => {
            return (
              <div>
                <button onClick={() => props.goto('welcome')}>previous</button>
                {props.message}
                <button onClick={() => props.transition('update')}>next</button>
              </div>
            )
          },
          {
            'update': [() => ({message: 'This is awesome!'})]
          }
        ]
      })}
    </div>
  )
}
```

React states machines works with react native, react dom and all environments using JSX.

## Getting started

A state machine is an object describing your application/component states.

```js
machine({
  state: [
    component,
    transitions
  ]
})
```

A state is composed of a component as well as an optional object containing transitions to mutate this component. Here's an example that shows how to style an input when empty using a transition called `validity`:

```js
machine({
  'inputState': [
    props => <input className={props.invalid ? 'invalid' : ''} onChange={e => props.transition('validity', e.target.value)}/>,
    {
      'validity': [(prev, value) => {
        return {
          invalid: !value
        }
      }]
    }
  ]
})
```

A transition is a function used to pass props to your component and update it. This function can return any types as well as promises (transition is resolved with the promise).

A transition is also useful to describe the passage to an other state. Here's an example:

```js
machine({
  'formEmail': [
    props => {
      return (
        <div>
          <input type="email" />
          <button onClick={() => props.transition('next')}>next</button>
        </div>
      )
    },
    {
      next: [() => ({name: 'John Doe'}), 'formPassword']
    }
  ],
  'formPassword': [
    props => {
      return (
        <div>
          <h2>Hello {props.name}</h2>
          <input type="password" />
          <button>connect</button>
        </div>
      )
    }
  ]
})
```

But you also can go to an other state without transition:

```js
machine({
  'formEmail': [
    props => {
      return (
        <div>
          <input type="email" />
          <button onClick={() => props.goto('formPassword')}>next</button>
        </div>
      )
    }
  ],
  'formPassword': [
    props => {
      return (
        <div>
          <h2>Hello {props.name}</h2>
          <input type="password" />
          <button>connect</button>
        </div>
      )
    }
  ]
})
```

Check out [our test suite](./test/react-states-machine.test.js) for more information.

## Installation

```shell
npm install react-states-machine --save
```

[![NPM](https://nodei.co/npm/react-states-machine.png)](https://nodei.co/npm/react-states-machine/)


## Question

For questions and feedback please use our [twitter account](https://twitter.com/bredeleca). For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/bredele/contributing-guide/blob/master/community.md" target="_blank">community guideline</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

Cookie-token is an open source project and would not exist without its community. If you want to participate please make sure to read our <a href="https://github.com/bredele/contributing-guide/blob/master/community.md" target="_blank">guideline</a> before making a pull request. If you have any react-states-machine related project, component or other let everyone know in our wiki.


## Licence

The MIT License (MIT)

Copyright (c) 2016 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
