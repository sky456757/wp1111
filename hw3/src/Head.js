import React from 'react';
let e = 3;
class Head extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      // 將 value 設定為 this.state.value
      // 並監聽 onChange 來更新 state
      return (
        <header class="todo-app__header">
            <div class="todo-app__title">todos</div>
        </header>
      );
    }
  }
export default Head;