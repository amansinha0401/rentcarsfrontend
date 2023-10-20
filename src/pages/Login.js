import React from 'react'
import {Row , Col , Form , Input} from 'antd'
import { Link } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; 
//also use <link> for styles
// ..
AOS.init();
function Login() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)

 }
    return (
        <div className='login'>
            {loading && (<Spinner />)}
            <Row gutter={16} className='d-flex align-items-center' >

                <Col lg={16} style={{position: 'relative'}}>
                    <img 
                    className='w-100'
                    data-aos='slide-right'
                    data-aos-duration='1500'
                    src="https://www.usatoday.com/gcdn/presto/2019/07/01/USAT/85481db5-a4d6-40b5-a3ec-b2c4d8539ca5-P90355629_highRes_bmw-vision-m-next-be.jpg?crop=4960,2771,x0,y0&width=3200&height=1788&format=pjpg&auto=webp"/>
                     <h1 className='login-logo'>R E N T - C A R S </h1>
                </Col>
                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                         <h1>Login</h1>
                         <hr />
                         <Form.Item name='username' label='Username' rules={[{required: true}]}>
                             <Input/>
                         </Form.Item>
                         <Form.Item name='password' label='Password' rules={[{required: true}]}>
                             <Input type='password'/>
                         </Form.Item>

                         <button className='btn1 mt-2'>Login</button>

                         <hr />

                         <Link to='/register'>Click Here to Register</Link>
                       

                    </Form>
                </Col>

            </Row>

        </div>
    )
}

export default Login