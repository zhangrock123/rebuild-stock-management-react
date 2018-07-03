import React from 'react';

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      subTitle: props.subTitle
    };
  }

  render() {
    return (
      <div className="page-title">{this.state.title}{this.state.subTitle ? ` > ${this.state.subTitle}` : ''}</div>
    )
  }
}
