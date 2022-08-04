import { Component } from 'react';
import './button.styles.css';

class Button extends Component {
    render() {
        const {btn, onClick, classType, btnType} = this.props;
        return (
            <div className={classType}>
                <button className={btnType} onClick={onClick}>{btn}</button>
            </div>
        );
    }
}

export default Button;