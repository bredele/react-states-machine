/**
 * Dependencie(s)
 */

import React from 'react'


/**
 * State machine instance.
 *
 * @param {Object} flow
 * @param {Object} props
 * @api public
 */

export default (flow, props = {}) => {
  return <Machine flow={flow} {...props}/>
}


/**
 * State machine component.
 *
 * All props are passed to the state machine.
 * Props:
 *
 *  - flow: object describing state machine flow
 *
 *
 * @param {Object} props
 * @api public
 */

class Machine extends React.Component {

  constructor(props) {
    super(props)
    const {
      flow,
      ...attrs
    } = props
    this.state = {
      path: first(flow),
      data: attrs
    }
  }

  render () {
    const [state, transitions] = this.props.flow[this.state.path]
    return state({
      ...this.state.data,
      transition: transition(this, transitions),
      goto: (next, data) => goto(this, data, next)
    })
  }
}


/**
 * Transition factory (function that triggers
 * a state machine transition).
 *
 * @param {Object} source
 * @param {Object} transitions
 * @return {Function}
 * @api private
 */

function transition (source, transitions = {}) {
  return (path, ...args) => {
    const dest = transitions[path]
    if (dest) {
      const transition = [].concat(dest)
      Promise.resolve(transition[0](source.state.data, ...args))
        .then(data => goto(source, data, transition[1]))
    }
  }
}


/**
 * Change source state with given path and data.
 *
 * Avoid invalid attempt to destructure non-iterable instance.
 *
 * @param {Object} source
 * @param {Object} data
 * @param {String} path
 * @api private
 */

function goto (source, data, path) {
  source.setState(prev => {
    return {
      path: path || prev.path,
      data : data || prev.data
    }
  })
}



/**
 * Get first property of an object.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function first (obj) {
  for (var key in obj) return key
}
