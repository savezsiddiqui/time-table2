import React, { Component } from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'
import Schedule from '../data/schedule.json'
import subjectCode from '../data/subjectCode.json'

const required = (val) => val && val.length 
const regex = (val) => val && val.match(/[A-Z]\d{1,2}$/)

const Option = ({ name, code }) => {
    return (
        <option value={code}>{name}</option>
    )
}

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

        let HSS_subjects = []
        let Other_subjects = []
        Object.keys(subjectCode).forEach(key => {
            if (key.includes('HS'))
                HSS_subjects.push({ name: subjectCode[key], code: key })
            if (key.includes('MA') || key.includes('PH'))
                Other_subjects.push({ name: subjectCode[key], code: key })
        })

        return (
            <Container>
                <Row className='justify-content-center' >
                    <Col xs={12} sm={4}>
                        <Row>
                            <Col xs={12} className='text-center mt-4'>
                                <h2><b>LETS START</b></h2>
                            </Col>
                            <Col xs={12} className='mt-4'>
                                <LocalForm
                                    onSubmit={(values) => this.handleSubmit(values)}
                                    initialState={{
                                        batch: '',
                                        CS_elective: 'CI514',
                                        HSS_elective: '16HS531',
                                        Other_elective: '16MA531',
                                    }}>
                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.text model=".batch"
                                                id="batch" name="batch"
                                                placeholder="batch"
                                                className="form-control"
                                                validators={{
                                                    required, regex
                                                }}
                                            />
                                            <Errors
                                                className="text-danger  "
                                                model=".batch"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    regex: 'Incorrect Format'
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.select model=".CS_elective" id="CS_elective"
                                                name="CS_elective" className="form-control"
                                            >
                                                <option value='CI514'>Artificial Intelligence</option>
                                                <option value='CI513'>Software Engineering</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.select model=".HSS_elective"
                                                id="HSS_elective" name="HSS_elective"
                                                className="form-control"
                                            >
                                                {HSS_subjects.map(item => {
                                                    return <Option name={item.name}
                                                        code={item.code} key={item.code} />
                                                })}
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Col xs={12}>
                                            <Control.select model=".Other_elective"
                                                id="Other_elective" name="Other_elective"
                                                className="form-control"
                                            >{Other_subjects.map(item => {
                                                return <Option name={item.name}
                                                    code={item.code} key={item.code} />
                                            })}</Control.select>
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