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
	
	const today = new Date()
	const minDate = today.toLocaleDateString().split('/').reverse().join('-')
	const minTime = today.toLocaleTimeString().split(':').slice(0, 2).join(':')

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.stopPropagation();
		}
		
		event.preventDefault();
		setValidated(true);
	}

	function getFormModel() {
		let inputValues = {}
		let counter = 0
		const inputModels = document.querySelectorAll('[data-id="input-model"]')
		inputModels.forEach((inputModel) => {
			const inputValue = inputModel.value.trim()
			inputModel.value = inputValue
			if (inputValue !== '') {
				inputValues[inputModel.name] = inputValue
				counter++
			}
		})
		
		if (counter === 8) {
			setShow(false)
			inputValues.id = crypto.randomUUID()
			inputValues.date = minDate
			inputValues.time = minTime
			const newTask = JSON.parse(JSON.stringify(inputValues))
			props.setSaveTask([...props.saveTask, newTask])
		}
	}
	
	return (
		<>
			<Row>
				<Col>
					<Button onClick={toggleShow} variant="outline-success">Nova tarefa</Button>
				</Col>
			</Row>
			
			<Modal show={show} onHide={toggleShow} size="lg" centered>
				<Modal.Header closeButton>
					<Modal.Title>Nova Tarefa</Modal.Title>
				</Modal.Header>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Modal.Body>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} controlId="validationTitle">
								<InputGroup hasValidation>
									<InputGroup.Text>Título</InputGroup.Text>
									<Form.Control data-id="input-model" type="text" name='title'
										maxLength={80} required />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o título.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
						<Row className="mb-3 g-3">
							<Form.Group as={Col} md="6" controlId="validationDate">
								<InputGroup hasValidation>
									<InputGroup.Text>Prazo</InputGroup.Text>
									<Form.Control data-id="input-model" type="date" name="date_end" min={minDate} required />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o prazo (data final).
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationTime">
								<InputGroup hasValidation>
									<InputGroup.Text>Hora Final</InputGroup.Text>
									<Form.Control data-id="input-model" type="time" name="time_end" required />
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
									<Form.Select data-id="input-model" aria-label="statusModel" 
										aria-describedby="statusModel" defaultValue="" name="status" required>
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
									<Form.Select data-id="input-model" aria-label="priorityModel" 
										aria-describedby="priorityModel" defaultValue="" name="priority" required>
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
									<Form.Control data-id="input-model" type="text" name="perfil"
										aria-describedby="perfil-model" maxLength={30} required />
									<Form.Control.Feedback type="invalid">
										Por favor, insira o responsável (perfil).
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} lg="6" controlId="validationSendMail">
								<InputGroup hasValidation>
									<InputGroup.Text id="sendMail-model">E-mail</InputGroup.Text>
									<Form.Control data-id="input-model" type="email" name="sendMail"
										aria-describedby="perfil-model" maxLength={30} required />
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
									<Form.Control data-id="input-model" as="textarea" type="text" name="description"
										rows={3} maxLength={120} required />
									<Form.Control.Feedback type='invalid'>
										Insira uma descrição.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={toggleShow}>Cancelar</Button>
						<Button type="submit" variant="success" onClick={getFormModel}>Adicionar</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}