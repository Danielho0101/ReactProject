import { Component } from 'react';
import './button.styles.css';

class Button extends Component {
    render() {
        const {color, btn} = this.props;
        return (
            btn === 0? 
            <button className={`${color} btn btn0`} onClick={this.props.onClick}>{btn}</button>:
            <button className={`${color} btn`} onClick={this.props.onClick}>{btn}</button>
        );
    }
}

export default Button;