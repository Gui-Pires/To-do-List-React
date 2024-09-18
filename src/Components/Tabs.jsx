import { Col, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import tasks from './tasks3'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Filters from './Filters';
import Columns from './Columns';
import ModalComp from './Modal'
import TableComp from './Table'
import Download from './Download'
import Badge from 'react-bootstrap/Badge';

export default function TabsComp(props) {
	// Inicia exibindo as colunas abaixo na tabela
	// Os valores devem ser idênticos às chaves de Tasks
	const [headerTable, setHeaderTable] = useState([
		'title',
		'status',
		'priority',
		'date',
		'date_end'
	])

	// Limita quais colunas devem ser exibidas em Columns.jsx e Table.jsx, além de dar o nome formatado
	// Necessário por na ordem desejada
	const getHeader = {
		title: 'Título',
		description: 'Descrição',
		status: 'Status',
		priority: 'Prioridade',
		perfil: 'Perfil',
		sendMail: 'Enviar e-mail',
		date: 'Data',
		time: 'Hora',
		date_end: 'Data final',
		time_end: 'Hora final'
	}

	const [saveTask, setSaveTask] = useState(tasks)
	const [taskFilter, setTaskFilter] = useState(tasks)
	const [filters, setFilters] = useState({title: '', status: '', priority: '', date: '', date_end: ''})

	const titleFilterTab = () => {
		let filterTemp = 'Filtros'
		if (!filters) {
			return filterTemp
		}
		
		Object.values(filters).forEach(value => {
			if (value !== '') {
				filterTemp = <span>
					Filtros <Badge bg="primary" className="ms-1"><i className="bi bi-funnel"></i> {taskFilter.length}</Badge>
				</span>
			}
		})
		return filterTemp
	}

	useEffect(() => {
		const today = new Date()
		const date = today.toLocaleDateString().split('/').reverse().join('-')
		const time = today.toLocaleTimeString().split(':').slice(0, 2).join(':')
		let saveTaskCopyTemp = [...saveTask]

		saveTaskCopyTemp = saveTaskCopyTemp.map((task) => {
			if (task.status === 'Em Progresso'){
				if (task.date_end < date) {
					return {
						...task,
						status: 'Atrasado'
					}
				} else if(task.date_end === date && task.time_end < time) {
					return {
						...task,
						status: 'Atrasado'
					}
				}
			}
			return task
		})

		setSaveTask(saveTaskCopyTemp)
		setTaskFilter(saveTaskCopyTemp)

	}, [])
	
	return (
		<>
			<Row className="mt-4">
				<Col className="position-relative">
					<Tabs defaultActiveKey="filters" id="tabs" className="position-relative mb-3">
						<Tab eventKey="filters" title={titleFilterTab()}>
							<Filters saveTask={saveTask} taskFilter={taskFilter} 
								setTaskFilter={setTaskFilter} filters={filters} setFilters={setFilters} />
						</Tab>
						<Tab eventKey="columns" title="Colunas">
							<Columns headerTable={headerTable} setHeaderTable={setHeaderTable} getHeader={getHeader} />
						</Tab>
						<Tab eventKey="table-download" title="Download">
							<Download saveTask={saveTask} taskFilter={taskFilter} />
						</Tab>
					</Tabs>
					<div className="position-absolute top-0 end-0 mx-3">
						<ModalComp saveTask={saveTask} setSaveTask={setSaveTask} />
					</div>
				</Col>
			</Row>
			<TableComp header={headerTable} taskFilter={taskFilter} setTaskFilter={setTaskFilter} 
				getHeader={getHeader} filters={filters} saveTask={saveTask} setSaveTask={setSaveTask} />
		</>
	);
}