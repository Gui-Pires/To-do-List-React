import { Col, Row } from 'react-bootstrap'

export default function Download(props) {

    function handleDownload(current = false) {
        const data = current ? props.taskFilter : props.saveTask
        const jsonString = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'dados.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <Row className="my-4">
            <Col className="d-flex gap-2">
                <button className="btn btn-outline-primary" onClick={() => handleDownload()}>
                    <i className="bi bi-download me-2"></i>
                    JSON Completo
                </button>
                <button className="btn btn-outline-primary" onClick={() => handleDownload(true)}>
                    <i className="bi bi-download me-2"></i>
                    JSON Tabela Atual
                </button>
            </Col>
        </Row>
    )
}