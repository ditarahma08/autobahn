import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styles from '@/styles/Dashboard.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
)

const Dashboard = () => {
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

	const labels = ['Issue A', 'Issue B', 'Issue C', 'Issue D']

	const data = {
	  labels,
	  datasets: [
	    {
	      label: 'Dataset 2',
	      data: [75, 100, 80, 90, 40],
	      backgroundColor: 'rgba(53, 162, 235, 0.5)',
	    },
	  ],
	}

	return (
		<div className={`container`}>
			<div className={`d-flex justify-content-between m-5`}>
				<p>Hello, User</p>
				<p className={styles.logout}>Logout</p>
			</div>

			<div className={`${styles.data} p-5`}>
				<div className={`d-flex justify-content-around mb-5`}>
					<div className={`${styles.bar} d-flex flex-column`}>
						<p>System Score</p>
						<span>100%</span>
					</div>

					<div className={`${styles.bar} d-flex flex-column`}>
						<p>System Score Changes</p>
						<span>10%</span>
					</div>
				</div>

				<div className={`mt-5`}>
					<div className={styles.chart}>
						<Bar options={options} data={data} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard