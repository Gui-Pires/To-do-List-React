import { Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

export default function Columns (props) {
	const columns = Object.keys(props.getHeader)

	function getCheckboxesChecked () {
		let checkboxes = []
		let checkboxesChecked = document.querySelectorAll('section input[type="checkbox"]:checked')
		checkboxesChecked.forEach((checkbox) => {
			checkboxes.push(checkbox.value)
		})
		props.setHeaderTable(checkboxes)
	}

	function addCheckboxes(key, i) {
		const isCheck = props.headerTable.includes(key) ? true : false
		
		return (
			<Col key={i}>
				<Form.Check type="switch" id={`${key}-column`} value={key} label={props.getHeader[key]} checked={isCheck} onChange={getCheckboxesChecked} />
			</Col>
		)
	}
	
	return (
		<section id="columns">
			<h4 className="title">Colunas</h4>
			<Row className="row-cols-2 my-4">
				{columns.map((key, index) => addCheckboxes(key, index))}
			</Row>
		</section>
	)
}