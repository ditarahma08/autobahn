import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import MainLayout from '../layouts/MainLayout'
import Login from '../components/Login'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const token = Cookies.get('authToken')
const username = Cookies.get('user')

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		if (token && username) {
			router.push(`/dashboard/${username}`)
		}
	}, [])

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
