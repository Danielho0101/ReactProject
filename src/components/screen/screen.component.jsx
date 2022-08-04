import { Component } from 'react';
import './screen.styles.css';

class Screen extends Component {
    render() {
        const {calculationChain, currentValue, totalValue} = this.props;
        return (
            <div className="screen">
                <div className='item1'>{calculationChain}</div>
                <div className='item2'>{totalValue === null? currentValue:totalValue}</div>
            </div>
        );
    }
}

export default Screen;