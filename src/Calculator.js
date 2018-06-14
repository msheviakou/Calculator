import React, { Component } from 'react';
import math from 'math-expression-evaluator';
import './Calculator.css';

class Output extends Component {
    render() {
        return <div className="inputOutput">{this.props.output}</div>;
    }
}

class Input extends Component {
    render() {
        return <div className="inputOutput">{this.props.input}</div>;
    }
}

class Display extends Component {
    render() {
        return (
            <div className="display">
            	<Output output={this.props.display.result}/>
            	<Input input={this.props.display.expression}/>
            </div>
        );
    }
}

class Button extends Component {
    buttonClick = () => {
        this.props.clickHandler(this.props.title);
    };

    render() {
        return (
            <div className="button"><button onClick={this.buttonClick}>{this.props.title}</button></div>
        );
    }
}

class Buttons extends Component {
    buttonClick = buttonName => {
        this.props.clickHandler(buttonName);
    };

    render() {
        const buttonsRows = [];

        this.props.buttons.map((row) => {
            const buttons = [];
            row.map((elem) => {
                buttons.push(<Button title={elem} clickHandler={this.buttonClick}/>);
            })
            buttonsRows.push(<div className="buttonsRow">{buttons}</div>);
        })

        return (
            <div className="buttons">{buttonsRows}</div>
        );
    }
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            expression: ""
        };
    }

    buttonClick = buttonName => {
        this.setState(this.calculate(this.state, buttonName));
    }

    calculate = (display, buttonName) => {
        const reg =  /^\d+$/;
        const lastChar = display.expression.substr(display.expression.length - 1);

        if (buttonName === "C")
            return {
                result: "",
                expression: ""
            };

        if (buttonName === "=" && reg.test(lastChar))
            return {
                result: math.eval(display.expression)
            };

        if (buttonName === lastChar)
            return {
                expression: display.expression
            };

        return {
            expression: display.expression + buttonName
        };
    }

    render() {
        return (
        	<div className="calculatorContainer">
	        	  <Display display={this.state}/>
                          <Buttons clickHandler={this.buttonClick} buttons={BUTTONS}/>
	        </div>
        );
    }
}
export default Calculator;

const BUTTONS = [
  	[7, 8, 9, '='],
  	[4, 5, 6, '+'],
  	[1, 2, 3, '-'],
  	['*', 0, '/', 'C']
];
