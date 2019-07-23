import React, { Component } from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import Schedule from '../data/schedule.json'

const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val))

class FormComponent extends Component {

    handleSubmit(values) {

        console.log(values)

        const batch = values.batch
        const CS_elective = values.CS_elective
        const HSS_elective = values.HSS_elective
        const elective = values.Other_elective

        const batchRegex = batch.length == 2 ?
            '(' + batch + '|' + 'LAB\\(' + '|' + batch[0] + '[1-' + batch[1] +
            ']-([' + batch[1] + '-9]|1\\d))'
            : '(' + batch + '|' + 'LAB\\(' + '|' + batch[0] + '.*(1[0-' + batch[2] +
            ']-1[' + batch[2] + '-4]|,' + batch.slice(1, 3) + ')' + ')'

        const CS_elect_lab = CS_elective === 'CI514' ? 'CI574' : 'CI573'
        const compulsory = 'CI511|CI571|CI575|CI576'
        const regex = new RegExp(batchRegex + ".*(" + HSS_elective + '|' + elective + '|'
            + CS_elective + '|' + CS_elect_lab + '|' + compulsory + ')')
        console.log(regex)

        const mySchedule = Schedule.map(item => {
            let newObject = {}
            Object.keys(item).forEach((key, index) => {

                if (index === 0)
                    newObject[key] = item[key]
                else
                    newObject[key] = item[key].filter(element => element.match(regex))
            });

            return newObject
        })

        console.log(mySchedule)
        window.localStorage.setItem('schedule', JSON.stringify(mySchedule))
        window.location.reload()
    }

    render() {
        return (
            <Container>
                <Row className='justify-content-center' >
                    <Col xs={12} sm={4}>
                        <Row>
                            <Col xs={12} className='text-center mt-4'>
                                <h2><b>LETS START</b></h2>
                            </Col>
                            <Col xs={12} className='mt-4'>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.text model=".batch"
                                                id="batch" name="batch"
                                                placeholder="batch"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger  "
                                                model=".batch"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.text model=".CS_elective"
                                                id="CS_elective" name="CS_elective"
                                                placeholder="CS_elective"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".CS_elective"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.text model=".HSS_elective"
                                                id="HSS_elective" name="HSS_elective"
                                                placeholder="HSS_elective"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".HSS_elective"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.text model=".Other_elective"
                                                id="Other_elective" name="Other_elective"
                                                placeholder="Maths/Physics Elective"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".Other_elective"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group text-center">
                                        <Col>
                                            <Button type="submit" color="primary">
                                                Send!
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FormComponent