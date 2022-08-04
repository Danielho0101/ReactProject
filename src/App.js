import './App.css';
import { Component } from 'react';
import Screen from './components/screen/screen.component';
import Button from './components/button/button.component'

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
        "−": (current, last) => Number(last) - Number(current),
        "×": (current, last) => Number(last) * Number(current),
        "÷": (current, last) => Number(current) === 0? 0 : Number(last) / Number(current)
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

    // prevent enter number after % and =
    if (this.state.calculationChain.at(-1) === "%") {return;}
    if (!this.state.operator && this.state.totalValue) {return;}

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
    // cannot add another decimal point to a decimal number
    if (this.state.currentValue.includes('.')) {return;}
    // cannot add decimal point if after "="
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
    // cannot operate if the second value is not yet provided
    if ("+−×÷".includes(this.state.calculationChain.at(-1))) {return;}
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
      let updateValue = calculate(this.state.currentValue, this.state.totalValue);
      updateValue = parseFloat(updateValue.toFixed(10)).toString()
      this.setState({
        totalValue: updateValue,
        currentValue: "",
        operator: newOperator,
        calculationChain: newCalChain
      });
    }
  }

  equalClick(event) {
    // cannot equal if 1) only the first value is entered;
    // 2) repeat equal; 3) after +-x/
    if (!this.state.operator || "+−×÷".includes(this.state.calculationChain.at(-1))) {return;}
    const calculate = this.state.arithmetics[this.state.operator];
    let updateValue = calculate(this.state.currentValue, this.state.totalValue);
    updateValue = parseFloat(updateValue.toFixed(10)).toString()
    this.setState({
      totalValue: updateValue,
      currentValue: updateValue,
      operator: null
    });

  }

  percentageClick(event) {
    // cannot change to % after +-x/
    if ("+−×÷".includes(this.state.calculationChain.at(-1))) {return;}
    const newCalChain = this.state.calculationChain + "x1%";
 
    if (!this.state.operator) {
      // for first entry
      if (this.state.totalValue === null /* && this.state.currentValue */) {
        const updateValue = parseFloat((Number(this.state.currentValue) /100).toFixed(10)).toString();
        this.setState({
          currentValue: updateValue,
          totalValue: updateValue,
          calculationChain: newCalChain
        });
      }
      //  % after =
      else {
        this.setState({
          currentValue: parseFloat((Number(this.state.currentValue) /100).toFixed(10)).toString(),
          totalValue: parseFloat((Number(this.state.totalValue) /100).toFixed(10)).toString(),
          calculationChain: newCalChain
        });
      }
    }
    else {
      const calculate = this.state.arithmetics[this.state.operator];
      const updateValue = calculate(this.state.currentValue, this.state.totalValue);
      this.setState({
        currentValue: parseFloat((Number(updateValue) /100).toFixed(10)).toString(),
        totalValue: parseFloat((updateValue /100).toFixed(10)).toString(),
        calculationChain: newCalChain,
        operator: null
      });
    }
  }

  invertClick(event) {
    // cannot invert after +-x/
    if ("+−×÷".includes(this.state.calculationChain.at(-1))) {return;}
    const chain = this.state.calculationChain;
    const index = chain.lastIndexOf(this.state.operator);
    const endChain = chain.charAt(index+1) === "-"? chain.substring(index+2):`-${chain.substring(index+1)}`;

    // first entry and after = (no operator, then times -1)
    if (!this.state.operator) {
      this.setState({
        currentValue: (Number(this.state.currentValue) * -1).toString(),
        totalValue: (Number(this.state.currentValue) * -1).toString(),
        calculationChain: chain + "x-1"
      });
    }
    // while calculating with operator, invert the sign of the latest input
    else {
      this.setState({
        currentValue: (Number(this.state.currentValue) * -1).toString(),
        calculationChain: chain.substring(0, index+1) + endChain
      });
    }
  }

  render() {
    console.log({
      total: this.state.totalValue,
      operator: this.state.operator,
      current: this.state.currentValue
    });

    const btnValues =  [
      'C', '%', '±', '÷',
      7, 8, 9, '×',
      4, 5, 6, '−', 
      1, 2, 3, '+',
      ".", 0, '='];

    return (
      <div>
        <nav class="nav">
          <p class="nav-name">DIGIMON</p> 
        </nav>
        <div className="box">
          <div className="grid-container">
            <Screen 
              totalValue={this.state.totalValue}
              currentValue={this.state.currentValue} 
              calculationChain={this.state.calculationChain}
            />
            {btnValues.map((btn, i) => {
              let onClick;
              let classType = "item";
              let btnType = "";
              if (typeof btn === "number") {
                  onClick = this.numClick;
              }
              else if (btn === ".") {
                  onClick = this.decimalClick;
              }
              else if (btn === "C") {
                  onClick = this.clearClick;
                  btnType = "btn-c";
              }
              else if (btn === "%") {
                  onClick = this.percentageClick;
              }
              else if (btn === "±") {
                  onClick = this.invertClick;
              }
              else if ("+−×÷".includes(btn)) {
                  onClick = this.arithmeticClick;
              }
              else if (btn === "=") {
                  onClick = this.equalClick;
                  classType = "item-equal";
                  btnType ="btn-equal";
              }
              return <Button key={i} btn={btn} classType={classType} btnType={btnType} onClick={onClick} />
          })}
          </div>
        </div>
        <footer>
          <p>Copyright &copy; Digimon 2022</p>
        </footer>
      </div>     
    );
  }
}

export default App;
 