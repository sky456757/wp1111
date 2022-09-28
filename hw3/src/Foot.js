import React from 'react';
import {Section,N2} from './Section';
let block = (num) =>{
  return(
    <footer class="todo-app__footer">
            <div class = "todo-app__total">{num} left</div>
            <ul class = "todo-app__view-buttons">
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
            </ul>
            <div class = "todo-app__clean">
                <button>Clear completed</button>
            </div>
        </footer>
  )
}
class Foot extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputvalue: '',
        hasBlock: this.props.ListsValue,
        Remain: this.props.Rm
      }
    }
    render() {
      // 將 value 設定為 this.state.value
      // 並監聽 onChange 來更新 state
      return (
        this.props.ListsValue ? block(this.props.Rm) : null
      );
    }
  }
   
export default Foot;
