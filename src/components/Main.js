import React, { Component } from 'react'
import { Container, Row, ButtonGroup, Button, Col } from 'react-bootstrap'
import FlipPage from 'react-flip-page'

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

    onPageChange = (index, direction) => {
        this.setState({
            index
        })
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
                    let time = ''
                    let subject = subjectCode[str.slice(str.indexOf('(') + 1,
                        str.indexOf(')'))]
                    let location = str.slice(str.indexOf(')') + 2, str.indexOf('/'))

                    if (subject.endsWith('Lab')) {
                        let time1 = parseInt(key.slice(0, key.indexOf('-')))
                        time = time1 + '-' + (time1 + 1) + ':50' + key.slice(key.length - 2, key.length)
                    }
                    else
                        time = key
                    RenderData.push({ time, subject, location })
                }
            })
        console.log(RenderData)
        const CardRender = RenderData.map(item => {
            return <Card
                subject={item.subject}
                style={{ height: 300, width: 100 }}
                location={item.location}
                time={item.time} />
        })

        return (

            <Container fluid className='text-center my_container'>
                <Row>
                    <Col xs={12}>
                        <h2 className='mt-4'>{schedule[this.state.index].day}</h2>
                    </Col>
                    <div className="flip-root mb-2" style={{ margin: 'auto' }}>
                        <FlipPage
                            orientation='horizontal'
                            responsive={true}
                            loopForever={true}
                            onPageChange={this.onPageChange}
                            animationDuration={300}
                            startAt={0}
                        >
                            <div className="card_list">{CardRender}</div>
                            <div className="card_list">{CardRender}</div>
                            <div className="card_list">{CardRender}</div>
                            <div className="card_list">{CardRender}</div>
                            <div className="card_list">{CardRender}</div>
                            <div className="card_list">{CardRender}</div>
                        </FlipPage>
                    </div>
                    {/* <Col xs={12}>
                        <ButtonGroup>
                            <Button variant="secondary"
                                onClick={() => this.onClickLeft()}
                            >Left</Button>
                            <Button variant="secondary"
                                onClick={() => this.onClickRight()}
                            >Right</Button>
                        </ButtonGroup>
                    </Col> */}
                </Row>
                <Button
                    className='fixed'
                    style={{ border: 0, textDecoration: 'underline' }}
                    onClick={() => this.Reset()}
                >Reset
                </Button>
            </Container >
        )
    }
}

export default Main