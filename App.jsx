import React, { Component } from 'react';
import _ from 'lodash';
// import ApiMenu from './renderer/ApiMenu';
// import ApiInfoWrapper from './renderer/ApiInfoWrapper';

export class App extends Component {
  static defaultProps = {
    title: ''
  };

  props: {
    title: string;
  };

  test = () => {
    let a = [1, 2, 3];
    _.map(a, (v) => {
      console.log('========v=', v);
    });
  };

  render() {
    return (<h1 onClick={this.test}>hello { this.props.title || 'react.js' }</h1>);
    // return (
    //   <div>
    //     <ApiMenu
    //       className="scrollbar-v-xs"
    //       mode="view"
    //       baseUrl=""
    //       value={this.props}
    //     />
    //     <ApiInfoWrapper className="scrollbar-v-xs" value={this.props} />
    //   </div>
    // )
  }
}
