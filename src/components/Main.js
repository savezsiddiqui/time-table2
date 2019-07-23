import React, { Component } from 'react'
import { Container, Row, ButtonGroup, Button, Col } from 'react-bootstrap'

const Card = ({ subject, location, time }) => {
    return (
        <Col xs={12}>
            <p className='mb-0'>{subject}</p>
            <p className='mt-0'>{time} | {location}</p>
        </Col>
    )
}

class Main extends Component {

    state = {
        index: 0,
    }

    onClickLeft() {
        this.setState({
            index: this.state.index === 0 ? 5 : this.state.index - 1
        })
    }

    onClickRight() {
        this.setState({
            index: this.state.index === 5 ? 0 : this.state.index + 1
        })
    }

    Reset() {
        window.localStorage.removeItem('schedule')
        window.location.reload()
    }

    render() {

        const { schedule, subjectCode } = this.props
        const item = schedule[this.state.index]
        let RenderData = []

        Object.keys(item)
            .forEach((key, index) => {
                if (index > 0 && item[key].length > 0) {

                    let str = item[key][0]
                    let time = key
                    let subject = subjectCode[str.slice(str.indexOf('(') + 1,
                        str.indexOf(')'))]
                    let location = str.slice(str.indexOf(')') + 2, str.indexOf('/'))

                    RenderData.push({ time, subject, location })
                }
            })

        const CardRender = RenderData.map(item => {
            return <Card
                subject={item.subject}
                location={item.location}
                time={item.time} />
        })

        return (
            <Container className='text-center'>
                <Row>
                    <Col xs={12}>
                        <h2>{schedule[this.state.index].day}</h2>
                    </Col>
                    {CardRender}
                    <Col xs={12}>
                        <ButtonGroup>
                            <Button variant="secondary"
                                onClick={() => this.onClickLeft()}
                            >Left</Button>
                            <Button variant="secondary"
                                onClick={() => this.onClickRight()}
                            >Right</Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={12}>
                        <Button
                            style={{ border: 0, marginTop: 50, textDecoration: 'underline' }}
                            onClick={() => this.Reset()}>Reset</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Main