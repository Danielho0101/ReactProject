import './App.css';
import { Component } from 'react';
import Keyboard from './components/keyboard/keyboard.component';
import Screen from './components/screen/screen.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      totalValue: null,
      operator: null,
      calculationChain: "0",
      arithmetics: {
        "+": (current, last) => Number(last) + Number(current),
        "-": (current, last) => Number(last) - Number(current),
        "x": (current, last) => Number(last) * Number(current),
        "/": (current, last) => Number(current) === 0? 0 : Number(last) / Number(current)
      }
    };
    this.numClick = this.numClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
    this.clearClick = this.clearClick.bind(this);
    this.percentageClick = this.percentageClick.bind(this);
    this.invertClick = this.invertClick.bind(this);
    this.arithmeticClick = this.arithmeticClick.bind(this);
    this.equalClick = this.equalClick.bind(this);
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
    console.log(this.state.totalValue);
  }

  decimalClick(event) {
    if (this.state.currentValue.includes('.')) {return;}
    if (this.state.operator === null && this.state.totalValue) {return;}
    this.setState({
      currentValue: this.state.currentValue + ".",
      calculationChain: this.state.calculationChain + "."
    });
  }

  clearClick(event) {
    this.setState({
      currentValue: "0",
      totalValue: null,
      operator: null,
      calculationChain: "0"
    });
  }

  arithmeticClick(event) {
    if ("+-x/".includes(this.state.calculationChain.at(-1))) {return;}
    const newOperator = event.target.innerHTML;
    const newCalChain = this.state.calculationChain + newOperator;

    if (this.state.operator === null) {
      this.setState({
        totalValue: this.state.currentValue,
        currentValue: "",
        operator: newOperator,
        calculationChain: newCalChain
      });
    }
    else {
      const calculate = this.state.arithmetics[this.state.operator];
      this.setState({
        totalValue: calculate(this.state.currentValue, this.state.totalValue).toString(),
        currentValue: "",
        operator: newOperator,
        calculationChain: newCalChain
      });
    }
  }

  equalClick(event) {
    if (!this.state.operator || "+-x/".includes(this.state.calculationChain.at(-1))) {return;}
    const calculate = this.state.arithmetics[this.state.operator];
    const updateValue = calculate(this.state.currentValue, this.state.totalValue).toString();
    this.setState({
      totalValue: updateValue,
      currentValue: updateValue,
      operator: null
    });

  }

  // NOT finished
  percentageClick(event) {
    if ("+-x/".includes(this.state.calculationChain.at(-1))) {return;}
    const newCalChain = this.state.calculationChain + "x1%";
    const calculate = this.state.arithmetics[this.state.operator];
    const updateValue = calculate(this.state.currentValue, this.state.totalValue);
    this.setState({
      totalValue: parseFloat((updateValue /100).toFixed(10)).toString(),
      calculationChain: newCalChain
      // currentValue: parseFloat((Number(this.state.currentValue) /100).toFixed(10)).toString(),
      // calculationChain: parseFloat((Number(this.state.calculationChain) /100).toFixed(10)).toString()
    });
  }

  //NOT finfished
  invertClick(event) {
    this.setState({
      currentValue: (Number(this.state.currentValue) * -1).toString(),
      calculationChain: (Number(this.state.calculationChain) * -1).toString()
    });
  }

  render() {
    console.log({
      total: this.state.totalValue,
      operator: this.state.operator,
      current: this.state.currentValue
    });

    return (
      <div id="wrapper">
        <Screen 
          totalValue={this.state.totalValue} 
          calculationChain={this.state.calculationChain} 
        />
        <Keyboard clickHandlers={{
          numClick: this.numClick,
          decimalClick: this.decimalClick,
          arithmeticClick: this.arithmeticClick,
          equalClick: this.equalClick,
          clearClick: this.clearClick,
          percentageClick: this.percentageClick,
          invertClick: this.invertClick
        }} />
      </div>
    );
  }
}

export default App;
 