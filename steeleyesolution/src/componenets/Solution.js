import React from 'react'

class SomeListComponent extends React.Component {
  constructor (props) {
    // we should always call the parent class constructor
    // while intializing states super should be used with props to invoke parent class constructor
    super(props);   
    // we should not copy props into state.
    // if using, we should keep track of the changed states using componentDidUpdate(oldProps) method.
    // Because there's no need of having two data sources with same content.
    // As if props gets updated in parent it will automatically re-render the child
    this.state = { items: props.items }
    //we need to bind the current component with the event handelers,
    //Alterntively we can use => function with the event itself
    this.handleClick=this.handleClick.bind(this);
}

  //since we copied props into state
  componentDidUpdate(oldProps) {
    // By duplicating the data, we have to then keep the local copy in sync with the updated props
    if(oldProps.items !== this.props.items) {
    // This triggers an unnecessary re-render
        this.setState({
            items: this.props.items
        });
    }
  }

  shouldComponentUpdate (nextProps) {
    //If props are updated it will return true, and hence componentDidUpdate() will be invoked and component re-render,
    // else it component will not update
    return nextProps.items !== this.props.items
  }

  handleClick (index) {
    //invoking the click function definde in parent
    // onClick method passed as props should not be in the camelCase as react used event handelers are also in the same case.
    this.props.onClickChild(index)
  }

  renderElement (item, index) {
    //  each child should have unique key
    // event handeler should be added at the text not at the entire li block
    return <li key={index}><span onClick={() => this.handleClick(index)}>{item.text}</span></li>
  }

  render () {
    return (
      <ul style={{ backgroundColor: 'red', height: 100 }}>
        {this.state.items.map((item, i) => this.renderElement(item, i))}
      </ul>
    )
  }
}

export default SomeListComponent