# React State Machine

[![Build Status](https://travis-ci.org/bredele/react-states-machine.svg?branch=master)](https://travis-ci.org/bredele/react-states-machine)
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
        'welcome': [
          props => <button onClick={() => props.transition('click')}>Welcome</button>,
          {
            'click': [
              () => ({message: 'Hello you!'}),
              'next'
            ]
          }
        ],
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
