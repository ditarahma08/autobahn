import styles from '@/styles/Login.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/utils/api';
import { connect } from "react-redux"
import { setInfo } from "../../store/actions/main"
import Cookies from 'js-cookie';

import MainLayout from '../layouts/MainLayout'

const datasetsDefault = [75, 100, 80, 90, 40]

const Login = (props) => {
	const { name, setInfo } = props
	const router = useRouter();

	const [formState, setFormState] = useState('login');
	const [username, setUsername] = useState('')
	const [userEmail, setUserEmail] = useState('');
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isDisabled, setIsDisabled] = useState(true)
	const [successSignUp, setSuccessSignUp] = useState(false)

	const checkFormEmpty = () => {
		if (formState === 'login') {
			if (userEmail.trim() !== '' && password.trim() !== '') {
				setIsDisabled(false)
			}
		} else {
			if (userEmail.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && (password === confirmPassword)) {
				setIsDisabled(false)
			}
		}
	}

	const changeForm = () => {
		setUserEmail('')
		setPassword('')
		setConfirmPassword('')
		setIsDisabled(true)
		formState === 'login' ? setFormState('signup') : setFormState('login')
	}

	const loginUser = async () => {
		const params = {
			email: userEmail,
			password: password
		}

		try {
			await api.post(`${process.env.BASE_URL}api/v1/user/signin`, params).then(response => {
				if (response.data.status) {
					Cookies.set('authToken', response?.data?.token, { expires: 1, path: '/' });
					Cookies.set('user', response?.data?.data?.username, { expires: 1, path: '/' })
					setInfo(response?.data?.data?.id)

					setTimeout(() => {
						router.push(`/dashboard/${response?.data?.data?.id}`)
					}, 500)
				}
			})
		} catch (e) {
			console.log(e)
		}
	}

	const registerUser = async () => {
		const params = {
			"fullname": username,
			"email": userEmail,
			"password": password
		}

		try {
			await api.post(`${process.env.BASE_URL}api/v1/user/signup`, params).then(response => {
				if (response.data.status) {
					createData(response.data.newUser._id)
					setSuccessSignUp(true)
				}
			});
		} catch (e) {
			console.log(e)
		}
	}

	const createData = async (id) => {
		const params = {
			labels: ['Issue A', 'Issue B', 'Issue C', 'Issue D'],
	    datasets: datasetsDefault,
	    color: 'rgba(53, 162, 235, 0.5)',
	    score: datasetsDefault.reduce((item, a) => item + a, 0),
	    scoreChange: 10,
		  userId: id
		}

		try {
			await api.post(`${process.env.BASE_URL}api/v1/chart/add`, params).then(response => {
				if (response.data.status) {
					setInfo(response.data.newChart.userId)
				}
			});
		} catch (e) {
			console.log(e)
		}
	}

	const sendForm = () => {
		formState === 'login' ? loginUser() : registerUser()
	}

	useEffect(() => {
		checkFormEmpty();
	}, [userEmail, password, confirmPassword])

	useEffect(() => {
		setSuccessSignUp(false)
	}, [formState])

	return (
		<>
			<MainLayout>
				<main className={styles.main}>
	  			<div className={styles.box}>
	  				{formState === 'signup' &&
		  				<input
		  					type="text"
		  					className={`form-control ${styles.formInput}`}
		  					placeholder="username"
		  					value={username}
		  					onChange={(e) => setUsername(e.target.value)}
		  				/>
	  				}

	  				<input
	  					type="email"
	  					className={`form-control ${styles.formInput}`}
	  					placeholder="email"
	  					value={userEmail}
	  					onChange={(e) => setUserEmail(e.target.value)}
	  				/>

	  				<input
	  					type="password"
	  					className={`form-control ${styles.formInput}`}
	  					placeholder="password"
	  					value={password}
	  					onChange={(e) => setPassword(e.target.value)}
	  				/>

	  				{formState === 'signup' &&
	  					<input
	  						type="password"
	  						className={`form-control ${styles.formInput}`}
	  						placeholder="confirm password"
	  						value={confirmPassword}
	  						onChange={(e) => setConfirmPassword(e.target.value)}
	  					/>
	  				}

	  				{formState === 'signup' && (password !== confirmPassword) &&
	  					<p className={styles.warning}>Your confirmed password don't match</p>
	  				}

	  				{successSignUp == true &&
	  					<p className={`${styles.success} mt-2`}>Congratulation your account has been successfully created. <br/>Now you can <a onClick={() => setFormState('login')}>login here.</a></p>
	  				}

	  				<div className={`${styles.box} ${styles.boxAction}`}>
	  					<button
	  						className="btn btn-danger"
	  						disabled={isDisabled}
	  						onClick={() => sendForm()}
	  					>
	  						{formState === 'login' ? 'Login' : 'Sign Up'}
	  					</button>

	  					{formState === 'login' &&
	  						<a onClick={() => changeForm()}>Doesn't have account? Register here.</a>
	  					}

	  					{formState === 'signup' &&
	  						<a onClick={() => changeForm()}>Have an account? Login here.</a>
	  					}
	  				</div>
	  			</div>
				</main>
			</MainLayout>
		</>
	);
}

const mapStateToProps = state => {
	return { name: state.main.name }
}

const mapDispatchToProps = {
	setInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)