import { Component } from 'react';
import './screen.styles.css';

class Screen extends Component {
    render() {
        return (
            <div>
                <div className='screen'>
                    <div id="screen-chain">{this.props.calculationChain}</div>
                </div>
                <div className='screen'>
                    <div id="screen-value">{this.props.currentValue}</div>
                </div>
            </div>
        );
    }
}

export default Screen;