import styles from '@/styles/Login.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../layouts/MainLayout'

const Login = () => {
	const router = useRouter();

	const [formState, setFormState] = useState('login');
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isDisabled, setIsDisabled] = useState(true)
	const [successSignUp, setSuccessSignUp] = useState(false)

	const checkFormEmpty = () => {
		if (formState === 'login') {
			if (email.trim() !== '' && password.trim() !== '') {
				setIsDisabled(false)
			}
		} else {
			if (email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && (password === confirmPassword)) {
				setIsDisabled(false)
			}
		}
	}

	const changeForm = () => {
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setIsDisabled(true)
		formState === 'login' ? setFormState('signup') : setFormState('login')
	}

	const sendForm = () => {
		router.push(`/dashboard`)
	}

	useEffect(() => {
		checkFormEmpty();
	}, [email, password, confirmPassword])

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
	  					value={email}
	  					onChange={(e) => setEmail(e.target.value)}
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

export default Login