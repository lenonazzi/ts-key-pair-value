import React, { useState, useRef } from "react"
import logo from './logo.svg'
import './App.css'

interface ITask {
  title: string
  foo: boolean
}

interface IList {
  [key: string]: ITask[]
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const initialList = {
    category: [
      {
        title: "Teste",
        foo: false
      }
    ],
    price: [
      {
        title: "R$ 10,00",
        foo: false
      }
    ]
  }

  const [list, setList] = useState<IList>(initialList)

  const handleAdd = (): void => {
    if (inputRef.current === null) {
      return
    }

    const keyName = inputRef.current.value

    if (!keyName) {
      return
    }

    const newValue = {
      title: "Teste 2",
      foo: true
    }

    if (list[keyName]) {
      const oldValue = list[keyName]

      oldValue.push(newValue)

      setList((prevState) => ({ ...prevState, [keyName]: oldValue }))
    } else {
      setList((prevState) => ({ ...prevState, [keyName]: [newValue] }))
    }
  }

  const handleClear = (): void => {
    setList({})
  }

  const handleRemove = (keyName: string): void => {
    if (list[keyName]) {
      setList((prevState) => ({ ...prevState, [keyName]: [] }))
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div>
        {Object.entries(list).map(([keyName], index) => {
          return (
            <ul key={index}>
              <h3>
                {keyName} (<span onClick={() => handleRemove(keyName)}>x</span>)
              </h3>

              {list[keyName].map((item, i) => (
                <li key={i}>
                  {item.title} - {item.foo.toString()}
                </li>
              ))}
            </ul>
          )
        })}
      </div>

      <div className="action-form">
        <input type="text" ref={inputRef} />

        <button onClick={handleAdd}>Add</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  )
}

export default App
