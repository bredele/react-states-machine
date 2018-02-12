/**
 * Dependencie(s)
 */

import React from 'react'
import machine from '../lib'
import renderer from 'react-test-renderer'


test('should render first state', () => {
  const flow = renderer.create(machine({
    'init': [
      props => <button>hello world</button>
    ]
  }))
  let tree = flow.toJSON()
  expect(tree).toMatchSnapshot()
})


test('should render given state', () => {
  const flow = renderer.create(machine({
    'init': [
      props => <button>hello world</button>
    ],
    'other': [
      props => <button>other</button>
    ]
  }, {}, 'other'))
  let tree = flow.toJSON()
  expect(tree).toMatchSnapshot()
})


test('should go to given state', () => {
  const flow = renderer.create(machine({
    'init': [
      props => <button onClick={() => props.goto('other')}>hello world</button>
    ],
    'other': [
      props => <button>other</button>
    ]
  }))

  let tree = flow.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onClick()


  tree = flow.toJSON()
  expect(tree).toMatchSnapshot()
})

test('should go to given state and pass props', () => {
  const flow = renderer.create(machine({
    'init': [
      props => <button onClick={() => props.goto('other', {
        label: 'what'
      })}>hello world</button>
    ],
    'other': [
      props => <button>props.label</button>
    ]
  }))

  let tree = flow.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onClick()


  tree = flow.toJSON()
  expect(tree).toMatchSnapshot()
})


test('should transition current state and update props', () => {
  const flow = renderer.create(machine({
    'init': [
      props => <button onClick={() => props.transition('john')}>hello {props.message || 'world'}</button>,
      {
        'john': [() => {
          return {
            message: 'john'
          }
        }]
      }
    ]
  }))

  let tree = flow.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onClick()

  tree = flow.toJSON()
  expect(tree).toMatchSnapshot()
})


test('should transition to other state and pass props', () => {
  const flow = renderer.create(machine({
    'init': [
      props => <button onClick={() => props.transition('next')}>hello world</button>,
      {
        'next': [() => ({message: 'other'}), 'other']
      }
    ],
    'other': [
      props => <span>{props.message}</span>
    ]
  }))

  let tree = flow.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onClick()


  tree = flow.toJSON()
  expect(tree).toMatchSnapshot()
})
