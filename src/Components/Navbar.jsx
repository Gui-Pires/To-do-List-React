import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'

export default function NavbarComp () {
	const moon = <i id="moon" className="bi bi-moon-stars-fill mx-1"></i>
	const sun = <i id="sun" className="bi bi-brightness-high-fill mx-1"></i>
	const [darkMode, setDarkMode] = useState(false)
	const [theme, setTheme] = useState(moon)

	function toggleMode() {
		const body = document.querySelector('body')

		setTheme(sun)
		body.setAttribute('data-bs-theme', 'dark')

		if (darkMode) {
			setTheme(moon)
			body.setAttribute('data-bs-theme', 'light')
		}

		setDarkMode(!darkMode)
	}

	useEffect(() => {
		const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
		if (prefersColorScheme.matches) {
			document.getElementById('dark-mode').checked = true
			toggleMode()
		}
	}, [])
	
	return (
		<Navbar id="navbar" sticky="top" className="min-h-0_75">
			<Container>
				<h3>Lista de Tarefas</h3>
				<Form>
					<Form.Check type="switch" id="dark-mode" label={theme} onClick={toggleMode} />
				</Form>
			</Container>
		</Navbar>
	)
}