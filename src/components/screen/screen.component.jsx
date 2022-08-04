import { Component } from 'react';
import './screen.styles.css';

class Screen extends Component {
    render() {
        return (
            <div className="screen">
                <div className='item1'>{this.props.calculationChain}</div>
                <div className='item2'>{this.props.totalValue || 0}</div>
            </div>
        );
    }
}

export default Screen;