'use client'

import { useEffect, useState } from 'react'
import { Container, Pagination } from 'react-bootstrap'
import './style.css'

export default function Home() {
  const screenWidth = window.screen.width
  const [num, setNum] = useState([])
  const [result, setResult] = useState([])
  const numLength = screenWidth < 768 ? 10 ** 4 : 10 ** 10

  useEffect(() => {
    setNum(() => getRandomNumber(numLength))
    const onKeypress = (e) => {
      let l = e.key
      if (l >= 0) {
        setResult((result) => [...result, l])
      }
      if (
        l === 'ContextMenu' ||
        l === ' ' ||
        l === 'Backspace' ||
        l === '§' ||
        l === '>' ||
        l === 'Enter'
      ) {
        setNum(() => getRandomNumber(numLength))
        setResult([])
      }
    }

    document.addEventListener('keypress', onKeypress)

    return () => {
      document.removeEventListener('keypress', onKeypress)
    }
  }, [])

  const validate = result.map((el, i) => (el == num[i] ? true : false))

  const getRandomNumber = (n) => {
    const random = Math.floor(Math.random() * n)
      .toString()
      .split('')
    while (random.length < 4) {
      random.unshift('0')
    }
    return random
  }

  return (
    <Container
      onClick={() => {
        setNum(getRandomNumber(numLength))
        setResult([])
      }}
      className="mt-5 d-flex flex-column align-items-center "
    >
      <Container
        onClick={() => {
          setNum(getRandomNumber(numLength))
          setResult([])
        }}
        className="d-block d-sm-none"
        fluid
      >
        <input type="tel" value="" className="input-for-mobile"></input>
      </Container>
      <Pagination size="lg">
        {num.map((el, i) => (
          <Pagination.Item
            key={i}
            className={`big ${
              validate[i] ? 'green' : validate[i] === false ? 'red' : ''
            }`}
          >
            {el}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  )
}
