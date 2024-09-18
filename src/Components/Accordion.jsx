import Accordion from 'react-bootstrap/Accordion';

function AccordionComp(props) {
	console.log(props)
	return (
		<Accordion defaultActiveKey='0' alwaysOpen>
			{props.acordeao.map((acordeao, index) => {
				return (
					<Accordion.Item eventKey={index} key={index}>
						<Accordion.Header>{acordeao.title}</Accordion.Header>
						<Accordion.Body>{acordeao.content}</Accordion.Body>
					</Accordion.Item>
				)}
			)}
		</Accordion>
	)
}

export default AccordionComp;