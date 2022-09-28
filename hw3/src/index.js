import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Head from './Head';
import {Section,N2} from './Section';
import Foot from './Foot';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));



class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListsValue: 0,
      Rm : 0
    }
    this.allocateNum=this.allocateNum.bind(this);
    this.adjRemain = this.adjRemain.bind(this);
  }
  allocateNum(amount){
      this.setState({ListsValue:amount})
  }
  adjRemain(amount){
    this.setState({Rm:amount})
  } 
  render() {
    // 將 value 設定為 this.state.value
    // 並監聽 onChange 來更新 state
    return (
      <React.StrictMode>
      <div class = "todo-app__root">
        <Head />
        <Section ListsValue={this.state.ListsValue} adj={this.allocateNum} adj2={this.adjRemain} Rm ={this.state.Rm}/>
        <Foot ListsValue={this.state.ListsValue}  Rm ={this.state.Rm}/>
      </div>
    </React.StrictMode>
    );
  }
}

root.render(
  <Root />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
