import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Container from '../components/Container/Container'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Container>
      <main className={styles.main}>
        <div className="text-3xl font-bold underline ">Hello World</div>
        <button>ToggleMode</button>
      </main>
    </Container>
  )
}
