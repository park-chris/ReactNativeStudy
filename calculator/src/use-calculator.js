import { useState } from 'react';

// hook은 use라는 이름으로 해야됨
export const useCalculator = () => {

    const [input, setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);
    const [isClickedOperator, setIsClickedOperator] = useState(false);
    const [isClickedEqual, setIsClickedEqual] = useState(false);

    // 어떤 값을 Boolean값으로 변화할때, 아래와 같은 식임
    // const hasInput = input ? true : false ;
    const hasInput = !!input;


    const onPressNum = (num) => {

        if (currentOperator && isClickedOperator) {
            setResult(input);
            setInput(num);
            setIsClickedOperator(false);
        } else {
            const newInput = Number(`${input}${num}`)
            setInput(newInput);
        }
    }

    const onPressOperator = (operator) => {
        if (operator !== "=") {
            setCurrentOperator(operator);
            setIsClickedOperator(true);
            setIsClickedEqual(false);
        } else {
            let finalResult = result;
            const finalInput = isClickedEqual ? tempInput : input;
            const finalOperator = isClickedEqual ? tempOperator : currentOperator;
            switch (finalOperator) {
                case '+':
                    finalResult = result + finalInput;
                    break;
                case '-':
                    finalResult = result - finalInput;
                    break;
                case '*':
                    finalResult = result * finalInput;
                    break;
                case '/':
                    finalResult = result / finalInput;
                    break;
                default:
                    break;
            }
            setResult(finalResult);
            setInput(finalResult);
            setTempInput(finalInput)
            setCurrentOperator(null);
            setTempOperator(finalOperator)
            setIsClickedEqual(true);

        }
    }

    const onPressReset = () => {
        if (hasInput) {
            setInput(0);
        } else {
            setInput(0);
            setCurrentOperator(null);
            setResult(null);
            setTempInput(null);
            setTempOperator(null);
        }
    }

    return {
        input,
        currentOperator,
        result,
        tempInput,
        tempOperator,
        hasInput,
        onPressNum,
        onPressOperator,
        onPressReset,
    }
};