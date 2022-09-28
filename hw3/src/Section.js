import React from 'react';
let N2 = 0;
class Section extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputValue: '',
        num: 0,
        num2: this.props.ListsValue,
        list: [],
        list2: [],
        Rm: this.props.Rm
      }
      this.adj=this.adj.bind(this);
    }

    
    HandleEnter = (e) =>{
        // enter 的 keyCode 是 13
        if( e.keyCode === 13 ){
          if(this.state.num === 0)
          {
            this.addFirstChild()
            this.state.num++;
          }
          this.addChild(this.state.inputValue)
          this.setState({inputValue: ''})

        }
    }
    Click = () =>{
        this.setState({textDecoration: 'line-through'})
        alert(this.state.textDecoration)
    }
    adj(n){
        this.props.adj(n+1);
    }
    adj2up(n){
      this.props.adj2(n+1);
    }
    adj2down(n){
      this.props.adj2(n-1);
    }
    addFirstChild = () => {
        // State change will cause component re-render
        this.setState(this.state.list = [{tag: "ul", class:"todo-app__list",id: "todo-list"}])
    }
    addChild = (m) => {
        // State change will cause component re-render
        let msg = m;
        let n = this.props.ListsValue;
        let child = (
            <li class ="todo-app__item">
                <div class="todo-app__checkbox">
                    <input id = {this.props.ListsValue} type="checkbox"
                    onChange={(event)=> {this.setState({textDecoration: 'line-through'})
                    if(event.target.parentElement.parentElement.children[1].style.opacity == 0.5)
                    {
                        event.target.parentElement.parentElement.children[1].style.opacity = 1;
                        this.adj2up(this.props.Rm);
                    }
                    else
                    {
                        event.target.parentElement.parentElement.children[1].style.opacity = 0.5;
                        this.adj2down(this.props.Rm);
                    }
                    if(event.target.parentElement.parentElement.children[1].style.textDecoration === 'line-through')
                    {
                        event.target.parentElement.parentElement.children[1].style.textDecoration = 'none';
                    }
                    else
                    {
                        event.target.parentElement.parentElement.children[1].style.textDecoration = 'line-through';
                    }
                }}
                    />
                    <label for = {this.props.ListsValue}/>
                </div>
                <h1 class = "todo-app__item-detail"
                >{msg}</h1>
                <img src = "./x.png" class = "todo-app__item-x" alt = "dlt"/>
            </li>
          );
        this.setState(()=>(this.state.list2[this.props.ListsValue] = child))
        this.adj(this.props.ListsValue);
        this.adj2up(this.props.Rm);
    }
    render() {
      // 將 value 設定為 this.state.value
      // 並監聽 onChange 來更新 state
      return (
        <section class="todo-app__main">
            <input type="text" class="todo-app__input" placeholder="What need to be done" 
                value={this.state.inputValue}
                onKeyDown={this.HandleEnter}
                onChange={(event)=> this.setState({inputValue: event.target.value})}
            />
            {this.state.num ? this.state.list2.map((item) => (item)) : null}
        </section>
      );
    }
  }


export {Section,N2};
