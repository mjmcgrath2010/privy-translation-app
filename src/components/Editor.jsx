import React, { Component } from 'react'
import styled from 'styled-components'
import CodeMirror from 'react-codemirror'
require('codemirror/lib/codemirror.css')

const Container = styled.div`
  margin: 1em auto 1em;
  position: relative;
  display: block;
  width: 95%;
  text-align: left;
  font-size: 16px;
  height: 90vh;
`
class Editor extends Component {
  updateCode = code => {
    this.props.onChange(code)
  }
  render() {
    const options = {
      lineNumbers: true,
      mode: { name: 'javascript', json: true },
    }
    const { code, rest } = this.props
    return (
      <Container>
        <CodeMirror value={code} onChange={this.updateCode} options={options} {...rest} />
      </Container>
    )
  }
}

export default Editor
