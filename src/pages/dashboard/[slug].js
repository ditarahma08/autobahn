import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styles from '@/styles/Dashboard.module.css'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { api } from '@/utils/api';
import MainLayout from '../../layouts/MainLayout'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
)

const token = Cookies.get('authToken')

const Dashboard = (props) => {
	const { slug } = props
	const router = useRouter();

	const [chartData, setChartData] = useState({})
	const [userData, setUserData] = useState({})

	const options = {
	  responsive: true,
	  maintainAspectRatio: true,
	  aspectRatio: 1 | 1,
	  plugins: {
	    legend: {
	    	display: false
	    }
	  }
	}

	const assignChartData = async (params) => {
		let newData = {
			score: params?.score,
			scoreChange: params?.scoreChange,
			chart: {
					labels: params?.labels,
					datasets: [
						{
							data: params?.datasets,
							backgroundColor: params?.color
						}
					]
				}
			}

			setChartData(newData)
	}

	const fetchChartData = async (id) => {
		try {
			await api.get(`${process.env.BASE_URL}api/v1/chart/${id}`).then((response) => {
				if (response.data) {
					assignChartData(response?.data)
				}
			})
		} catch (e) {
			console.log(e)
		}
	}

	const fetchUserData = async (id) => {
		try {
			await api.get(`${process.env.BASE_URL}api/v1/user/${id}`).then((response) => {
				if (response.data) {
					setUserData(response.data)
				}
			})
		} catch (e) {
			console.log(e)
		}
	}

	const logout = () => {
		token && Cookies.remove('authToken', { path: '/' })
		router.push('/')
	}

	useEffect(() => {
		if (!token) {
			router.push('/')
		}
	}, [])

	useEffect(() => {
		fetchChartData(slug)
		fetchUserData(slug)
	}, [slug])

	return (
		<MainLayout>
		<div className={`container`}>
			<div className={`d-flex justify-content-between m-5`}>
				<p>Hello, {userData?.fullname}</p>
				<p className={styles.logout} onClick={() => logout()}>Logout</p>
			</div>

			<div className={`${styles.data} p-5`}>
				<div className={`d-flex justify-content-around mb-5`}>
					<div className={`${styles.bar} d-flex flex-column`}>
						<p>System Score</p>
						<span>{chartData?.score}</span>
					</div>

					<div className={`${styles.bar} d-flex flex-column`}>
						<p>System Score Changes</p>
						<span>{chartData?.scoreChange}%</span>
					</div>
				</div>

				<div className={`mt-5`}>
					<div className={styles.chart}>
					{chartData?.chart && (
						<Bar options={options} data={chartData?.chart} />
					)}
					</div>
				</div>
			</div>
		</div>
		</MainLayout>
	)
}

const mapStateToProps = state => {
	return { userId: state.main.userId }
}

export default connect(mapStateToProps)(Dashboard)

export async function getServerSideProps({ query }) {
	 const { slug } = query;
	 return { props: { slug } }
}