import React from 'react';
import './index.less';

export default class ImagePreview extends React.Component{

  constructor(props){
    super(props);
    this.state={
      imgList: props.imgList,
      index: 0
    };
  }


  render(){
    return (
      <span>
        <img src="" alt=""/>
      </span>
    );
  }
}
