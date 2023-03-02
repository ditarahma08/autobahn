import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import MainLayout from '../layouts/MainLayout'
import Login from '../components/Login'

export default function Home() {
  return (
    <>
      <MainLayout>
        <main className={styles.main}>
          <Login />
        </main>
      </MainLayout>
    </>
  )
}
