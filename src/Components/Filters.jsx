import { Col, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function Filters (props) {

	useEffect(() => {
		props.setTaskFilter(props.saveTask)
		onFilterTask(props.filters)
	}, [props.saveTask])

	const rulesFilters = {
		date: (task, filterDate) => {
			if (task.date >= filterDate) {
				return true
			}
		},
		date2: (task, filterDate) => {
			if (task.date <= filterDate) {
				return true
			}
		},
		date_end: (task, filterDate) => {
			if (task.date_end >= filterDate) {
				return true
			}
		},
		date_end2: (task, filterDate) => {
			if (task.date_end <= filterDate) {
				return true
			}
		}
	}
	
	function onFilterTask (command, clearFunction = false) {
		let filtersCopy = {...props.filters}
		let filterTemp = props.saveTask

		if (clearFunction) {
			filtersCopy = clearFunction
		}
		
		if (command.inputName) {
			filtersCopy[command.inputName] = command.inputValue
		}
		props.setFilters(filtersCopy)

		const keysFilters = Object.keys(filtersCopy)
		
		for (let i in keysFilters) {
			const currentFilter = keysFilters[i]
			if (filtersCopy[currentFilter]) {
				filterTemp = filterTemp.filter(task => {
					if (rulesFilters[currentFilter]){
						return rulesFilters[currentFilter](task, filtersCopy[currentFilter])
					} else {
						return task[currentFilter].toLowerCase().trim().includes(filtersCopy[currentFilter].toLowerCase().trim())
					}
				})
			}
		}

		if (!filterTemp.length && !props.filters) {
			filterTemp = props.saveTask
		}
		
		props.setTaskFilter(filterTemp)
	}

	function clearFilters () {
		const inputFilters = document.querySelectorAll('[data-id="input-filter"]')
		let keysFilters = {}
		inputFilters.forEach((inputFilter) => {
			inputFilter.value = ''
			keysFilters[inputFilter.name] = ''
		})
		props.setFilters(keysFilters)
		onFilterTask({}, keysFilters)
	}
	
	return (
		<section id="filters" className="position-relative">
			<h4 className="title">Filtros</h4>
			<Button variant="outline-danger" className="position-absolute top-0 end-0 col-2 col-lg-1" onClick={clearFilters}>
				<i className="bi bi-funnel-fill"></i>
			</Button>
			<Row className="mt-4">
				<Col lg="4">
					<InputGroup className="mb-3">
						<InputGroup.Text>Título</InputGroup.Text>
						<Form.Control data-id="input-filter" placeholder="" aria-label="Título"
							defaultValue="" name="title"
							onChange={(e) => {
								onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
							}}/>
					</InputGroup>
				</Col>
				<Col lg="4">
					<InputGroup className="mb-3">
						<InputGroup.Text>Status</InputGroup.Text>
						<Form.Select data-id="input-filter" aria-label="statusFilter"
							defaultValue="" name="status"
							onChange={(e) => {
								onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
							}}>
							<option value="">Todos</option>
							<option value="Em Progresso">Em Progresso</option>
							<option value="Completo">Completo</option>
							<option value="Atrasado">Atrasado</option>
						</Form.Select>
					</InputGroup>
				</Col>
				<Col lg="4">
					<InputGroup className="mb-3">
						<InputGroup.Text>Prioridade</InputGroup.Text>
						<Form.Select data-id="input-filter" aria-label="priorityFilter"
							defaultValue="" name="priority"
							onChange={(e) => {
								onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
							}}>
							<option value="">Todos</option>
							<option value="Alta">Alta</option>
							<option value="Média">Média</option>
							<option value="Baixa">Baixa</option>
						</Form.Select>
					</InputGroup>
				</Col>
			</Row>
			<Row className="mb-4">
				<Col lg="6">
					<InputGroup className="mb-3">
						<InputGroup.Text>Data inicial entre</InputGroup.Text>
						<Form.Control data-id="input-filter" type="date" 
						name="date" defaultValue="" 
						onChange={(e) => {
							onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
						}}/>

						<InputGroup.Text>e</InputGroup.Text>
						<Form.Control data-id="input-filter" type="date" 
						name="date2" defaultValue="" 
						onChange={(e) => {
							onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
						}}/>
					</InputGroup>
				</Col>
				<Col lg="6">
					<InputGroup className="mb-3">
						<InputGroup.Text>Data final entre</InputGroup.Text>
						<Form.Control data-id="input-filter" type="date" 
						name="date_end" defaultValue="" 
						onChange={(e) => {
							onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
						}}/>

						<InputGroup.Text>e</InputGroup.Text>
						<Form.Control data-id="input-filter" type="date" 
						name="date_end2" defaultValue="" 
						onChange={(e) => {
							onFilterTask({'inputName': e.target.name, 'inputValue': e.target.value})
						}}/>
					</InputGroup>
				</Col>
			</Row>
		</section>
	)
}