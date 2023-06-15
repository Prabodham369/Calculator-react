import React, { useReducer } from 'react';
import './style.css';
import DigitButton from './digit';
import OperationButton from './Operation';
 export const ACTIONS = { 
  ADD_DIGITS: 'add-digit',
  CHOOSE_OPERATION: 'choose operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evalute'
}
function reducer(state, { type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGITS:
      if(state.overwrite)
      return{
        ...state,
        currentOpernad: payload.digit,
        overwrite: false,
      }
      if(payload.digit === "0" && state.currentOpernad === "0") return state
      if(payload.digit === "." && state.currentOpernad.includes(".")) return state
     return {
      ...state,
      currentOpernad: `${state.currentOpernad || ""}${payload.digit}`,
    }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOpernad == null && state.previousOperand == null) return state
      if(state.previousOperand == null) 
      return{
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOpernad,
        currentOpernad: null,

        
      }
      
      if(state.currentOpernad==null)
      return{
        ...state,
        operation: payload.operation,
      }
        return{
          ...state,
          previousOperand: evalute(state),
          operation: payload.operation,
          currentOpernad: null,
      }

    case ACTIONS.CLEAR:
      return{ }
    
    case ACTIONS.EVALUATE:
      if(state.currentOpernad == null || state.operation == null || state.previousOperand == null)
      {return state}
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOpernad: evalute(state),

      }
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite)
        return{
          ...state,
          overwrite: false,
          currentOpernad: null,
        }
        if(state.currentOpernad == null)
        return state
        if(state.currentOpernad === 1)
        {
          return{...state, currentOpernad: null,}
        }
        return{
          ...state,
          currentOpernad: state.currentOpernad.slice(0, -1),
        }
        default:
        break;
      
  }
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
} )

function evalute({currentOpernad, previousOperand, operation}) 
{
  
const preview = parseFloat(previousOperand)
const current = parseFloat(currentOpernad)
if(isNaN(preview) || isNaN(currentOpernad)) return ""
let computation= ""
switch (operation) {
  case "+":
    computation = preview + current
    break

  case "-":
    computation = preview - current
    
    break
  
  case "*":
    computation = preview * current
    break
    
  case "/":
    computation = preview / current
    break

    default:
      break;
}
return computation.toString()
 

}
function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)

}
function App()
{
  const [{ currentOpernad, previousOperand, operation}, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        
        <div className="current-operand">{formatOperand(currentOpernad)}</div>
        
      </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
     
     </div>
      
      )
      }
    
export default App;
