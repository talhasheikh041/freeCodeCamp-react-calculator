import { useEffect, useState } from "react"

const calculatorData = [
  { id: "zero", value: "0" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "decimal", value: "." },
  { id: "add", value: "+" },
  { id: "subtract", value: "-" },
  { id: "multiply", value: "*" },
  { id: "divide", value: "/" },
]

function App() {
  const [input, setInput] = useState("")
  const [expression, setExpression] = useState("")
  const [evalute, setEvaluate] = useState("")

  useEffect(() => {
    handleMultipleOperators()
    setEvaluate(expression)
  }, [expression])

  function handleClear() {
    setInput("")
    setExpression("")
  }

  function handleEquals() {
    const result = eval(expression)
    const resultString = Number(result.toFixed(4)).toString()
    setInput(resultString)
    setExpression(resultString)
  }

  function handleMultipleOperators() {
    const checkMultipleOperatorsRegex =
      /(\+\+)|(\+\-)|(\+\*)|(\+\/)|(\-\-)|(\-\+)|(\-\*)|(\-\/)|(\*\*)|(\*\+)|(\*\/)|(\/\/)|(\/\+)|(\/\*)/g
    setExpression((prev) => {
      if (/^[+*/]/g.test(prev)) {
        return prev.replace(/[+*/]/, "")
      } else if (checkMultipleOperatorsRegex.test(prev)) {
        const secondLastIndex = prev.length - 2
        const updatedExp =
          prev.slice(0, secondLastIndex) + prev.slice(secondLastIndex + 1)
        return updatedExp
      } else {
        return prev
      }
    })
  }

  function handleOperator(value) {
    setExpression((prev) => `${prev}${value}`)
  }

  function handleDotOperator(value) {
    setExpression((prev) => {
      if (prev.length === 0 || /[+\-*/]$/.test(prev)) {
        return `${prev}0${value}`
      } else if (/\d+\.\d+[+\-*/]\d+$/.test(prev)) {
        return `${prev}${value}`
      } else if (/\d+\.\d+/.test(prev)) {
        return prev
      } else if (/\d+\./.test(prev)) {
        return prev
      } else {
        return `${prev}${value}`
      }
    })
  }

  function handleNumbers(value) {
    setExpression((prev) => `${prev}${value}`)

    // handling multiple zeroes
    setExpression((prev) => {
      if (/[+\-*/]?0[0-9]$/.test(prev)) {
        return prev.replace("0", "")
      } else {
        return `${prev}`
      }
    })
  }

  function displayInput(value) {
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      setInput(value)
    } else if (/[+\-*/]/.test(input) && value !== ".") {
      // second input
      setInput(value)
    } else if (value === ".") {
      // handling first decimal
      setInput((prev) => {
        if (prev.length === 0 || /[+\-*/]/.test(prev)) {
          return `0${value}`
        } else {
          // handling multiple decimals
          if (prev.length === 0 || /[+\-*/]$/.test(prev)) {
            return `${prev}0${value}`
          } else if (/\./.test(prev)) {
            return prev
          } else {
            return `${prev}${value}`
          }
        }
      })
    } else {
      setInput((prev) => `${prev}${value}`)

      // handling multiple zeroes
      setInput((prev) => {
        if (/[+\-*/]?0[0-9]$/.test(prev)) {
          return prev.replace("0", "")
        } else {
          return `${prev}`
        }
      })
    }
  }

  function handleClick(value) {
    displayInput(value)

    if (/[+\-*/]/.test(value)) {
      handleOperator(value)
    } else if (/\./.test(value)) {
      handleDotOperator(value)
    } else {
      handleNumbers(value)
    }
  }

  const calculatorBtns = calculatorData.map((btn) => {
    return (
      <button onClick={() => handleClick(btn.value)} key={btn.id} id={btn.id}>
        {btn.value}
      </button>
    )
  })

  return (
    <div className="calculator">
      <p id="expression">{evalute}</p>
      <p id="display">{input ? input : "0"}</p>
      {calculatorBtns}
      <button onClick={handleEquals} id="equals">
        =
      </button>
      <button onClick={handleClear} id="clear">
        AC
      </button>
    </div>
  )
}

export default App
