import { Col, Row } from 'react-bootstrap'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ModalComp(props) {
	const [show, setShow] = useState(false)
	const [validated, setValidated] = useState(false)
	const toggleShow = () => {
		setShow(!show)
		setValidated(false)
	}

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		}

		event.preventDefault();
		setValidated(true);
	}

	function removeTask(id) {
		const tasksCopy = [...props.saveTask]
		const index = tasksCopy.findIndex(task => task.id === id)
		tasksCopy.splice(index, 1)
		props.setSaveTask(tasksCopy)
	}

	function editTask(id) {
		const today = new Date()
		const date = today.toLocaleDateString().split('/').reverse().join('-')
		const time = today.toLocaleTimeString().split(':').slice(0, 2).join(':')
		
		let inputModelsViews = {}
		const inputView = document.querySelectorAll('[data-id="input-model-view"]')
		inputView.forEach((inputModelView) => {
			const inputValue = inputModelView.value.trim()
			inputModelView.value = inputValue
			if (inputValue !== '') {
				inputModelsViews[inputModelView.name] = inputValue
			}
		})

		if (inputModelsViews.status === 'Em Progresso') {
			if (inputModelsViews.date_end < date) {
				inputModelsViews.status = 'Atrasado'
			} else if(inputModelsViews.date_end === date && inputModelsViews.time_end < time) {
				inputModelsViews.status = 'Atrasado'
			}
		}

		const copySaveTask = props.saveTask.map((task) => {
			if (task.id === id) {
				return {
					...task,
					title: inputModelsViews.title,
					description: inputModelsViews.description,
					status: inputModelsViews.status,
					priority: inputModelsViews.priority,
					perfil: inputModelsViews.perfil,
					sendMail: inputModelsViews.sendMail,
					date_end: inputModelsViews.date_end,
					time_end: inputModelsViews.time_end
				}
			}
			return task
		})

		props.setSaveTask(copySaveTask)
	}

	const titleButton = props.typeView === 'remove' ? 'Excluir' : 'Editar'
	const titleView = titleButton + ' tarefa'
	const variantButton = props.typeView === 'remove' ? 'danger' : 'warning'
	const isDisable = props.typeView === 'remove' ? true : false
	const actionButton = props.typeView === 'remove' ? removeTask : editTask
	const buttonView = () => {
		if (props.typeView === 'remove'){
			return <button className="btn btn-sm color-red-table mx-1" onClick={toggleShow}><i className="bi bi-trash"></i></button>
		}
		return <button className="btn btn-sm color-yellow-table m-1" onClick={toggleShow}><i className="bi bi-pencil"></i></button>
	}
	
	return (
		<>
			{buttonView()}
			<Modal show={show} onHide={toggleShow} size="lg" centered>
				<Modal.Header closeButton>
					<Modal.Title>{titleView}</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Modal.Body>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} lg="12" controlId="validationTitle">
								<InputGroup hasValidation>
									<InputGroup.Text>Título</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="text" name='title'
										maxLength={80} defaultValue={props.task.title} disabled={isDisable} />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o título.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} md="6" controlId="validationDate">
								<InputGroup hasValidation>
									<InputGroup.Text>Data</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="date" 
										name="date" value={props.task.date} disabled />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o prazo (data final).
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationTime">
								<InputGroup hasValidation>
									<InputGroup.Text>Hora</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="time" 
										name="time" value={props.task.time} disabled />
									<Form.Control.Feedback type="invalid">
										Por favor, insira a hora de término.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} md="6" controlId="validationDateEnd">
								<InputGroup hasValidation>
									<InputGroup.Text>Data Final</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="date" 
										name="date_end" defaultValue={props.task.date_end} disabled={isDisable} />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o prazo (data final).
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationTimeEnd">
								<InputGroup hasValidation>
									<InputGroup.Text>Hora Final</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="time" 
										name="time_end" defaultValue={props.task.time_end} disabled={isDisable} />
									<Form.Control.Feedback type="invalid">
										Por favor, insira a hora de término.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} md="6" controlId="validationStatus">
								<InputGroup hasValidation>
									<InputGroup.Text id="statusModel">Status</InputGroup.Text>
									<Form.Select data-id="input-model-view" aria-label="statusModel" 
										aria-describedby="statusModel" name="status"
										defaultValue={props.task.status} disabled={isDisable}>
										<option value="" disabled>Todos</option>
										<option value="Em Progresso">Em Progresso</option>
										<option value="Completo">Completo</option>
										<option value="Atrasado">Atrasado</option>
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										Por favor, insira o status.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationPriority">
								<InputGroup hasValidation>
									<InputGroup.Text id="priorityModel">Prioridade</InputGroup.Text>
									<Form.Select data-id="input-model-view" aria-label="priorityModel" 
										aria-describedby="priorityModel" name="priority"
										defaultValue={props.task.priority} disabled={isDisable}>
										<option value="" disabled>Todos</option>
										<option value="Alta">Alta</option>
										<option value="Média">Média</option>
										<option value="Baixa">Baixa</option>
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										Por favor, insira a prioridade.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} lg="6" controlId="validationPerfil">
								<InputGroup hasValidation>
									<InputGroup.Text id="perfil-model">Responsável</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="text" name="perfil"
										aria-describedby="perfil-model" maxLength={30} 
										defaultValue={props.task.perfil} disabled={isDisable} />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o responsável (perfil).
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} lg="6" controlId="validationSendMail">
								<InputGroup hasValidation>
									<InputGroup.Text id="sendMail-model">E-mail</InputGroup.Text>
									<Form.Control data-id="input-model-view" type="email" name="sendMail"
										aria-describedby="perfil-model" maxLength={30} 
										defaultValue={props.task.sendMail} disabled={isDisable} />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o e-mail para enviarmos avisos.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3">
							<Form.Group as={Col} lg="12" controlId="validationDescription">
								<InputGroup hasValidation>
									<InputGroup.Text>Descrição</InputGroup.Text>
									<Form.Control data-id="input-model-view" as="textarea" type="text" name="description"
										rows={3} maxLength={120} defaultValue={props.task.description} disabled={isDisable} />
									<Form.Control.Feedback type='invalid'>
										Insira uma descrição.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={toggleShow}>Cancelar</Button>
						<Button type="submit" variant={variantButton} 
							onClick={() => {
								actionButton(props.task.id)
								toggleShow()
							}}>{titleButton}</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}