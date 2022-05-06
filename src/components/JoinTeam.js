import React, { useState } from 'react'
import { Modal, Form, Input, Button, Steps, Select, DatePicker, InputNumber, Upload, Result, Spin } from 'antd'
import { LoadingOutlined, CaretDownOutlined, CloseCircleTwoTone, PaperClipOutlined, CheckCircleTwoTone } from '@ant-design/icons'
import { storage } from '../firebaseConfig'
import '../App.css'
import moment from 'moment'

const JoinTeam = (props) => {
    const {joinTeamModal, setJoinTeamModal} = props
    const [loading, setloading] = useState(false)
    const [current, setCurrent] = useState(0)
    const [formData, setFormData] = useState({})
    const [form] = Form.useForm()
    const [feedback, setFeedback] = useState('')

    const DocumentUpload = async ({ file, onProgress, onSuccess, onError }) => {
        setloading(true)
        const FileID = `${formData['Email Address']}-${formData['Full Name']}-${formData['Contact Number']}`
		const response = storage.ref().child(`Resume/${FileID}`).put(file)
		response.on(
			'state_changed',
			(snapshot) => onProgress({ percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 }),
			(error) => onError(error),
			() => {setloading(false); onSuccess(null, response.metadata_)}
		)
	}

	const ChangeFileList = async ({fileList}) => {
        const FileID = `${formData['Email Address']}-${formData['Full Name']}-${formData['Contact Number']}`
		if( fileList.length>0) {
            if(fileList[0].url===undefined && fileList[0].status==='done') {
                storage.ref().child(`Resume/${FileID}`).getDownloadURL().then(result => fileList[0].url = result)
            }
		} else {
            storage.ref().child(`Resume/${FileID}`).delete()
        }
	}
    
    const onFinish = (values) => {
        if(current!==3) {
            setFormData({...formData, ...values})
            setCurrent(current + 1)
        } else {
            setloading(true)
            const AllData = {...formData, ...values}
            const SubmitData = { 
                ...AllData, 
                'Timestamp': moment().format('DD/MM/YYYY HH:mm:ss'),
                'Undergrad Graduation Year': AllData['Undergrad Graduation Year'].format('YYYY'),
                'Masters Degree Title & Specialization (e.g. MSc. Computer Science)': AllData['Masters Degree Title & Specialization (e.g. MSc. Computer Science)'] ? AllData['Masters Degree Title & Specialization (e.g. MSc. Computer Science)'] : '',
                'Masters University': AllData['Masters University'] ? AllData['Masters University'] : '',
                'Masters Graduation Year': AllData['Masters Graduation Year'] ? AllData['Masters Graduation Year'].format('YYYY') : '',
                'Which role or tech stack are you interested in?': AllData['Which role or tech stack are you interested in?'].join(', '),
                'What do you value most in a job? (select your top 3 priorities)': AllData['What do you value most in a job? (select your top 3 priorities)'].join(', '),
                'Which of the following do you think are your top three strengths?': AllData['Which of the following do you think are your top three strengths?'].join(', '),
                'Please upload your CV or resume (must be a PDF file)': AllData['Please upload your CV or resume (must be a PDF file)']?.[0]?.url ? AllData['Please upload your CV or resume (must be a PDF file)'][0].url : '',
            }
            console.log({SubmitData})
            fetch(
                'https://api.apispreadsheets.com/data/16638/', 
                {method: 'POST', body: JSON.stringify({'data': SubmitData})}
            )
            .then(response => {
                if (response.status === 201) {
                    setloading(false)
                    setFeedback('success')
                } else {
                    setloading(false)
                    setFeedback('error')
                }
            })
            .catch(() => {
                setloading(false)
                setFeedback('error')
            })
        }
	}

	const onCancel = () => {
		form.resetFields()
        setCurrent(0)
        setloading(false)
        setFeedback('')
		setJoinTeamModal(false)
	}

    const steps = [
        {
            title: 'Personal',
            content: (
                <>
                    <Form layout={'vertical'} form={form} onFinish={onFinish} scrollToFirstError>
                        <div className='FlexRowSpace'>
                            <Form.Item
                                label='Full Name'
                                name='Full Name'
                                rules={[{ required: true, message: 'Full name is required.' }]}
                                className='HalfFormItemWidth'
                            >
                                <Input className='InputField'/>
                            </Form.Item>
                            <Form.Item
                                label='Gender'
                                name='Gender'
                                rules={[{ required: true, message: 'Gender is required.' }]}
                                className='HalfFormItemWidth'
                            >
                                <Select className='SelectField' suffixIcon={<CaretDownOutlined />}>
                                    <Select.Option value="I prefer not to say">I prefer not to say</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='FlexRowSpace'>
                            <Form.Item
                                label='Email Address'
                                name='Email Address'
                                rules={[{ type: 'email', required: true, message: 'Valid email is required.' }]}
                                className='HalfFormItemWidth'
                            >
                                <Input className='InputField'/>
                            </Form.Item>
                            <Form.Item
                                label='Contact Number'
                                name='Contact Number'
                                rules={[{ required: true, message: 'Contact number is required.' }]}
                                className='HalfFormItemWidth'
                            >
                                <Input className='InputField'/>
                            </Form.Item>
                        </div>
                        <div className='FlexRowSpace'>
                            <Form.Item
                                label='Where are you based?'
                                name='Where are you based? (Current city or country)'
                                rules={[{ required: true, message: 'Current city or country is required.' }]}
                                className='HalfFormItemWidth'
                            >
                                <Input className='InputField' placeholder='Current city or country'/>
                            </Form.Item>
                        </div>
                    </Form>
                </>
            ),
        },
        {
            title: 'Education',
            content: (
                <>
                    <Form layout={'vertical'} form={form} onFinish={onFinish} scrollToFirstError>
                        <Form.Item
                            label='Undergraduate Degree Title &amp; Specialization'
                            name='Undergraduate Degree Title &amp; Specialization (e.g. BS. Computer Science)'
                            rules={[{ required: true, message: 'Undergrad degree title is required.' }]}
                        >
                            <Input className='InputField' placeholder={'BS. Computer Science'}/>
                        </Form.Item>
                        <Form.Item
                            label='Undergraduate University'
                            name='Undergraduate University'
                            rules={[{ required: true, message: 'Undergrad university name is required.' }]}
                        >
                            <Input className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='Undergrad Graduation Year'
                            name='Undergrad Graduation Year'
                            rules={[{ required: true, message: 'Undergrad graduation year is required.' }]}
                        >
                            <DatePicker className='InputField' picker='year' inputReadOnly/>
                        </Form.Item>
                        <Form.Item
                            label='Masters Degree Title &amp; Specialization'
                            name='Masters Degree Title &amp; Specialization (e.g. MSc. Computer Science)'
                        >
                            <Input className='InputField' placeholder={'MSc. Computer Science'}/>
                        </Form.Item>
                        <Form.Item
                            label='Masters University'
                            name='Masters University'
                        >
                            <Input className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='Masters Graduation Year'
                            name='Masters Graduation Year'
                        >
                            <DatePicker className='InputField' picker='year' inputReadOnly/>
                        </Form.Item>
                    </Form>
                </>
            ),
        },
        {
            title: 'Work Preferences',
            content: (
                <>
                    <Form layout={'vertical'} form={form} onFinish={onFinish} scrollToFirstError>
                        <Form.Item
                            label='Which role or tech stack are you interested in?'
                            name='Which role or tech stack are you interested in?'
                            rules={[{ required: true, message: 'Select roles or tech stacks in which you are interested.' }]}
                        >
                            <Select mode='multiple' className='SelectField' suffixIcon={<CaretDownOutlined />}>
                                <Select.Option value='React JS'>React JS</Select.Option>
                                <Select.Option value='Node JS'>Node JS</Select.Option>
                                <Select.Option value='Full Stack JS'>Full Stack JS</Select.Option>
                                <Select.Option value='Android'>Android</Select.Option>
                                <Select.Option value='iOS'>iOS</Select.Option>
                                <Select.Option value='Flutter'>Flutter</Select.Option>
                                <Select.Option value='React Native'>React Native</Select.Option>
                                <Select.Option value='Django/Python'>Django/Python</Select.Option>
                                <Select.Option value='SQA/Automation'>SQA/Automation</Select.Option>
                                <Select.Option value='UI/UX'>UI/UX</Select.Option>
                                <Select.Option value='Visual/Graphic Design'>Visual/Graphic Design</Select.Option>
                                <Select.Option value='Social Media Marketing'>Social Media Marketing</Select.Option>
                                <Select.Option value='Content Writing'>Content Writing</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Years of Experience'
                            name="Years of Experience (add 0 if you're a fresh graduate or still in college)"
                            rules={[{ required: true, message: "Add years of experience (0 if you're a fresh graduate or still in college)." }]}
                        >
                            <InputNumber min={0} className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='LinkedIn URL / Portfolio URL'
                            name='LinkedIn URL or Portfolio URL for designers'
                            rules={[{ type: 'url', required: true, message: 'Please enter a valid linkedin or portfolio url.' }]}
                        >
                            <Input className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='Upload CV or Resume'
                            name='Please upload your CV or resume (must be a PDF file)'
                            rules={[{ required: true, message: 'Please upload your CV/Resume.' }]}
                            valuePropName='fileList'
                            getValueFromEvent={event => Array.isArray(event) ? event : event?.fileList}
                        >
                            <Upload.Dragger
                                listType='picture'
                                maxCount={1}
                                customRequest = {DocumentUpload}
                                onChange = {ChangeFileList}
                            >
                                <p className='NoMargin'><PaperClipOutlined style={{fontSize: 36, color: '#1C75BC' }}/></p>
                                <p className='ant-form-item-label HalfMarginTop'>Upload Document</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form>
                </>
            ),
        },
        {
            title: 'Personal Interests',
            content: (
                <>
                    <Form layout={'vertical'} form={form} onFinish={onFinish}>
                        <Form.Item
                            label='Name one professional achievement and one personal achievement that you are most proud of.'
                            name='Name one professional achievement and one personal achievement that you are most proud of'
                            rules={[{ required: true, message: 'Please enter you professional and personal achievements.' }]}
                        >
                            <Input.TextArea rows={4} className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='What do you value most in a job? (select your top 3 priorities)'
                            name='What do you value most in a job? (select your top 3 priorities)'
                            rules={[{ validator: (rule, value = '') => value.length<3 ? Promise.reject(new Error(`Please select your top 3 priorities.`)) : Promise.resolve(value) }]}
                        >
                            <Select mode='multiple' max={3} className='SelectField' suffixIcon={<CaretDownOutlined />}
                                onChange={value => { value && value.length>3 && value.pop() }}
                            >
                                <Select.Option value='A handsome salary'>A handsome salary</Select.Option>
                                <Select.Option value='Stability in routine, tasks and workload'>Stability in routine, tasks and workload</Select.Option>
                                <Select.Option value='Future growth prospects'>Future growth prospects</Select.Option>
                                <Select.Option value='Company reputation and history'>Company reputation and history</Select.Option>
                                <Select.Option value='Having creative control over work'>Having creative control over work</Select.Option>
                                <Select.Option value='A flexible, results-oriented office culture'>A flexible, results-oriented office culture</Select.Option>
                                <Select.Option value='Work-life balance'>Work-life balance</Select.Option>
                                <Select.Option value='Impactful or fulfilling work'>Impactful or fulfilling work</Select.Option>
                                <Select.Option value='A supportive, and open-minded team'>A supportive, and open-minded team</Select.Option>
                                <Select.Option value='Work that I enjoy doing'>Work that I enjoy doing</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Which of the following do you think are your top three strengths?'
                            name='Which of the following do you think are your top three strengths?'
                            rules={[{ validator: (rule, value = '') => value.length<3 ? Promise.reject(new Error(`Please select your top 3 strengths.`)) : Promise.resolve(value) }]}
                        >
                            <Select mode='multiple' max={3} className='SelectField' suffixIcon={<CaretDownOutlined />}
                                onChange={value => { value && value.length>3 && value.pop() }}
                            >
                                <Select.Option value='Following instructions'>Following instructions</Select.Option>
                                <Select.Option value='Communication skills'>Communication skills</Select.Option>
                                <Select.Option value='Technical skills'>Technical skills</Select.Option>
                                <Select.Option value='Ability to learn fast'>Ability to learn fast</Select.Option>
                                <Select.Option value='Coordination and management'>Coordination and management</Select.Option>
                                <Select.Option value='Brainstorming and creativity'>Brainstorming and creativity</Select.Option>
                                <Select.Option value='Negotiation'>Negotiation</Select.Option>
                                <Select.Option value='Working independently'>Working independently</Select.Option>
                                <Select.Option value='Problem-solving'>Problem-solving</Select.Option>
                                <Select.Option value='Responsibility and time management'>Responsibility and time management</Select.Option>
                                <Select.Option value='Work ethic'>Work ethic</Select.Option>
                                <Select.Option value='Emotional intelligence'>Emotional intelligence</Select.Option>
                                <Select.Option value='Research'>Research</Select.Option>
                                <Select.Option value='Team work'>Team work</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Where did you hear about us?'
                            name='Where did you hear about us?'
                            rules={[{ required: true, message: 'This field is required.' }]}
                        >
                            <Select className='SelectField' suffixIcon={<CaretDownOutlined />}>
                                <Select.Option value="Social Media (Facebook/Instagram)">Social Media (Facebook/Instagram)</Select.Option>
                                <Select.Option value="LinkedIn">LinkedIn</Select.Option>
                                <Select.Option value="Emails">Emails</Select.Option>
                                <Select.Option value="Referral from a friend">Referral from a friend</Select.Option>
                                <Select.Option value="Job Website">Job Website</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </>
            ),
        },
    ]

    const ModalButtons = () => (
        <div className='FlexRowSpace'>
            {   current>0 ?
                <Button className='FooterButtons PreviousButton' onClick={() => setCurrent(current - 1)}>Back</Button> :
                <div></div>
            }
            {   current<steps.length-1 ?
                <Button className='FooterButtons NextButton' onClick={() => form.submit()} disabled={loading}>
                    {loading && <Spin indicator={<LoadingOutlined style={{ color: '#808080' }} spin />}/>}
                    {loading ? <span style={{marginLeft: 12}}>Next</span> : 'Next'}
                </Button> :
                <Button className='FooterButtons SubmitButton' onClick={() => form.submit()} disabled={loading}>
                    {loading && <Spin indicator={<LoadingOutlined style={{ color: '#808080' }} spin />}/>}
                    {loading ? <span style={{marginLeft: 12}}>Submit</span> : 'Submit'}
                </Button>
            }
        </div>
    )
	return ( 
		<Modal 
            visible={joinTeamModal}
            title='Join our Team'
            footer={feedback==='' && ModalButtons()}
            className='JoinTeamModal'
            onCancel={onCancel}
            maskClosable={false}
            closeIcon={<CloseCircleTwoTone style={{ fontSize: '20px'}} twoToneColor="#2E94FA"/>}
            centered
        >
            {   feedback==='' ? 
                <>
                    <Steps
                        current={current}
                        size='small'
                    >
                        {steps.map(item => (
                            <Steps.Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className='StepsContent'>{steps[current].content}</div>
                </> : 
                <Result
                    className='FullWidthHeight FlexColumnBox'
                    icon={feedback==='success' ? <CheckCircleTwoTone twoToneColor='#00c400'/> : <CloseCircleTwoTone twoToneColor={'#FF0000'} /> }
                    title={<p className='FormResultTitle'>{feedback==='success' ? 'Response Submitted' : 'Error'}</p>}
                    subTitle={
                        feedback==='success' ?
                        <p className='FormResultSubTitle' style={{fontSize: 16}}>Congratulations on becoming<br/>a part of We Over I's talent pool!</p> : 
                        <p className='FormResultSubTitle' style={{fontSize: 14}}>
                        Some error has occured while submitting your response.<br/>
                        Please try again or submit your reponse using this <a className='GoogleFormLink' target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSctuPrY03H79XgenTWW3DsLNkWkljSp955V3DfHvEygW9mS-A/viewform' rel='noreferrer'>google form</a>.</p>
                    }
                />
            }
        </Modal>
	)
}

export default JoinTeam