import { Component } from 'react';
import Button from '../button/button.component'
import './keyboard.styles.css';

class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnValues: 
                ['AC', '+/-', '%', '/',
                7, 8, 9, 'X',
                4, 5, 6, '-', 
                1, 2, 3, '+',
                0, '.', '=']
        };
    }

    render() {
        return (
            <div id="keyboard">
                {this.state.btnValues.map((btn, i) => {
                    let onClick;
                    const btnType = typeof btn;
                    const color = btnType === 'string'? 'sign':'digit'; 
                    if (btnType === "number") {
                        onClick = this.props.clickHandlers.numClick;
                    }
                    else if (btn === ".") {
                        onClick = this.props.clickHandlers.decimalClick;
                    }
                    else if (btn === "AC") {
                        onClick = this.props.clickHandlers.clearClick;
                    }
                    else if (btn === "%") {
                        onClick = this.props.clickHandlers.percentageClick;
                    }
                    else if (btn === "+/-") {
                        onClick = this.props.clickHandlers.invertClick;
                    }
                    return <Button key={i} btn={btn} color={color} onClick={onClick} />
                })}
            </div>
        );
    }
}

export default Keyboard;