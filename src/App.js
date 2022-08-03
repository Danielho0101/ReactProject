import './App.css';
import { Component } from 'react';
import Keyboard from './components/keyboard/keyboard.component';
import Screen from './components/screen/screen.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      totalValue: "0",
      operator: null,
      calculationChain: "0",
      arithmetics: {
        add: (current, last) => Number(last) + Number(current),
        minus: (current, last) => Number(last) - Number(current),
        multiply: (current, last) => Number(last) * Number(current),
        divide: (current, last) => Number(current) === 0? 0 : Number(last) / Number(current)
      }
    };
    this.numClick = this.numClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
    this.clearClick = this.clearClick.bind(this);
  }

  numClick(event) {
    let updateValue;
    let newCalChain;
    const clickedValue = event.target.innerHTML;
    if (this.state.currentValue === "0") {
      newCalChain = this.state.calculationChain.substring(0, this.state.calculationChain.length-1) + clickedValue;
      updateValue = clickedValue;
    }
    else {
      newCalChain = this.state.calculationChain + clickedValue;
      updateValue = this.state.currentValue + clickedValue;
    }
    this.setState({
      currentValue: updateValue,
      calculationChain: newCalChain
    });
  }

  decimalClick(event) {
    if (this.state.currentValue.includes('.')) {return;}
    this.setState({
      currentValue: this.state.currentValue + ".",
      calculationChain: this.state.calculationChain + "."
    });
  }

  clearClick(event) {
    this.setState({
      currentValue: "0",
      totalValue: "0",
      operator: null,
      calculationChain: "0"
    });
  }

  arithmeticClick(event) {

  }

  equalClick(event) {

  }

  percentageClick(event) {

  }

  positiveNegativeClick(event) {

  }

  render() {
    return (
      <div id="wrapper">
        <Screen 
          currentValue={this.state.currentValue} 
          calculationChain={this.state.calculationChain} 
        />
        <Keyboard clickHandlers={{
          numClick: this.numClick,
          decimalClick: this.decimalClick,
          arithmeticClick: this.arithmeticClick,
          equalClick: this.equalClick,
          clearClick: this.clearClick,
          percentageClick: this.percentageClick,
          positiveNegativeClick: this.positiveNegativeClick
        }} />
      </div>
    );
  }
}

export default App;
 