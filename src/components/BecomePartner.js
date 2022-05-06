import React, {useState} from 'react'
import { Modal, Form, Input, Button, Spin, Result } from 'antd'
import '../App.css'
import { LoadingOutlined, CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import moment from 'moment'

const BecomePartner = (props) => {
    const {becomePartnerModal, setBecomePartnerModal} = props
    const [loading, setloading] = useState(false)
    const [form] = Form.useForm()
    const [feedback, setFeedback] = useState('')

    const onFinish = (values) => {
        setloading(true)
        const SubmitData = { ...values, 'Timestamp': moment().format('DD/MM/YYYY HH:mm:ss') }
		fetch(
            'https://api.apispreadsheets.com/data/16581/', 
            {method: 'POST', body: JSON.stringify({'data': SubmitData})}
        ).then(response => {
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

	const onCancel = () => {
		form.resetFields()
        setloading(false)
        setFeedback('')
		setBecomePartnerModal(false)
	}

    const ModalButtons = () => (
        <Button className='FooterButtons NextButton' onClick={() => form.submit()} disabled={loading}>
            {loading && <Spin indicator={<LoadingOutlined style={{color:'#808080'}} spin />}/>}
            {loading ? <span style={{marginLeft: 12}}>Submit</span> : 'Submit'}
        </Button>
    )

	return ( 
		<Modal 
            visible={becomePartnerModal}
            title='Become a Partner'
            footer={feedback==='' && ModalButtons()}
            className='BecomePartnerModal'
            onCancel={onCancel}
            maskClosable={false}
            closeIcon={<CloseCircleTwoTone style={{ fontSize: '20px'}} twoToneColor="#2E94FA"/>}
            centered
        >
            {   feedback==='' ? 
                    <Form layout={'vertical'} form={form} onFinish={onFinish}>
                        <Form.Item
                            label='Email Address'
                            name='Email address'
                            rules={[{ type: 'email', required: true, message: 'Valid email address is required.' }]}
                        >
                            <Input className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='What problem are you trying to solve?'
                            name='What problem are you trying to solve?'
                            rules={[{ required: true, message: 'This field is required.' }]}
                        >
                            <Input.TextArea rows={4} className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='Who are you solving this problem for?'
                            name='Who are you solving this problem for?'
                            rules={[{ required: true, message: 'This field is required.' }]}
                        >
                            <Input.TextArea rows={4} className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='Tell us a bit about the founding team'
                            name='Tell us a bit about the founding team'
                            rules={[{ required: true, message: 'This field is required.' }]}
                        >
                            <Input.TextArea rows={4} className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='How far along are you?'
                            name='How far along are you?'
                            rules={[{ required: true, message: 'This field is required.' }]}
                        >
                            <Input.TextArea rows={4} className='InputField'/>
                        </Form.Item>
                        <Form.Item
                            label='Website/App Link'
                            name='Please share a website/app link if available'
                            rules={[{ type: 'url', required: true, message: 'Please enter a valid url.' }]}
                        >
                            <Input className='InputField'/>
                        </Form.Item>
                    </Form> : 
                    <Result
                        className='FullWidthHeight FlexColumnBox'
                        icon={feedback==='success' ? <CheckCircleTwoTone twoToneColor='#00c400'/> : <CloseCircleTwoTone twoToneColor={'#FF0000'} /> }
                        title={<p className='FormResultTitle'>{feedback==='success' ? 'Response Submitted' : 'Error'}</p>}
                        subTitle={
                            feedback==='success' ?
                            <p className='FormResultSubTitle' style={{fontSize: 14}}>Thanks for getting in touch.<br/>We will get back to you shortly.</p> : 
                            <p className='FormResultSubTitle'>Some error has occured while submitting your response.<br/>Please try again or submit your reponse using this <a className='GoogleFormLink' target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSfiRXljO0c4A7w9AcyAObkkWDNtxZ-bwN8iLUNqC9MWJjUDVA/viewform' rel='noreferrer'>google form</a>.</p>
                        }
                    />
            }
        </Modal>
	)
}

export default BecomePartner