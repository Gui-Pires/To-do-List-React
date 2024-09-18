import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react'
import ViewTask from './ViewTask'
import Badge from 'react-bootstrap/Badge';

export default function TableComp(props) {

	useEffect(() => {
		handleOrderBy(itemHeader, true)
	}, [props.filters])
		
	const colorsForColumns = {
		'Alta': 'color-red-table',
		'Atrasado': 'color-red-table',
		'Em Progresso': 'color-yellow-table',
		'Média': 'color-yellow-table',
		'Completo': 'color-green-table',
		'Baixa': 'color-green-table'
	}

	const [itemHeader, setItemHeader] = useState('')
	const [isAscending, setIsAscending] = useState(false)

	function handleOrderBy (att, actionFun = false) {
		const tasksCopy = [...props.taskFilter]
		
		const tasksCopySorted = tasksCopy.sort((a, b) => {
			if (att === itemHeader) {
				if (isAscending) {
					if (!actionFun) {
						setIsAscending(false)
						return a[att] < b[att] ? 1 : a[att] > b[att] ? -1 : 0
					}
					return a[att] < b[att] ? -1 : a[att] > b[att] ? 1 : 0
				} else {
					if (!actionFun) {
						setItemHeader('')
						setIsAscending(true)
						return 0
					}
					return a[att] < b[att] ? 1 : a[att] > b[att] ? -1 : 0
				}
			} else {
				setItemHeader(att)
				setIsAscending(true)
				return a[att] < b[att] ? -1 : a[att] > b[att] ? 1 : 0
			}
		})
		
		props.setTaskFilter(tasksCopySorted)
	}

	function addLine(task) {
		const sequence = Object.keys(props.getHeader)

		return (
			<tr key={task.id} className='text-center align-middle'>
				{sequence.map((itemHeader) => {
					if (props.header.includes(itemHeader)) {
						let valueTask = task[itemHeader]
						valueTask = itemHeader.includes('date') ? valueTask.split('-').reverse().join('/') : valueTask
						return (
							<td key={itemHeader} className={`${colorsForColumns[valueTask]}`}>{valueTask}</td>
						)
					}
				})}
				<td>
					<ViewTask task={task} saveTask={props.saveTask} setSaveTask={props.setSaveTask} typeView={'edit'}/>
					<ViewTask task={task} saveTask={props.saveTask} setSaveTask={props.setSaveTask} typeView={'remove'}/>
				</td>
			</tr>
		)
	}

	const filterHeader = <i className="bi bi-funnel float-end small"></i>
	const arrowDown = <i className="bi bi-arrow-down float-end small"></i>
	const arrowUp = <i className="bi bi-arrow-up float-end small"></i>
	
	return (
		<>
			<span className="float-end text-muted small mb-2">Resultados <Badge bg="primary">{props.taskFilter.length}</Badge></span>
			<Table striped bordered hover>
				<thead>
					<tr className="text-center align-middle">
						{props.header.map((item, index) => {
							return (
								<th key={index} onClick={() => { handleOrderBy(item) }}>
									{props.getHeader[item]}
									{props.filters && props.filters[item] && filterHeader}
									{itemHeader === item && (isAscending ? arrowDown : arrowUp)}
								</th>
							)
						})}
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{props.taskFilter.map((task) => {
						return ( addLine(task) )
					})}
				</tbody>
			</Table>
		</>
	);
}