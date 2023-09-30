import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Select, Card, Row, Col, Divider,notification } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import Navigation from '../common/Navigation';
import axios, { Axios } from 'axios';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Link, useParams, useNavigate } from 'react-router-dom'

dayjs.extend(customParseFormat);

const { TextArea } = Input;

const dateFormat = 'YYYY/MM/DD';

const Details = () => {

    const [item, setItems] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState('');
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState('');
    const [phone, setPhone] = useState("");
    const [id, SetID] = useState("");
    const history = useNavigate();


    const onChangeDate = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString);

    };
    
    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();

            if (item !== '' && price !== '') {
                const i = {
                    item: item,
                    description: description,
                    price: price,
                    qty: qty,
                    date: date,
                };

                try {
                    await axios.post('http://localhost:4000/items/create', i);
                    console.log('Created Successful'); // Log success message
                    notification.success({
                        message: 'Successfully Added Product',
                        description: 'You have successfully Added Product',
                    });
                    history("/product")
                    
                } catch (error) {
                    console.error('Error creating item:', error);
                    // Handle the error, show an error message, or perform other actions as needed.
                }
            }
        }
    }

    let customerId = 0; // Initialize the customer ID

    // function generateUniqueId() {
    //     customerId++; // Increment the customer ID
    //     return `customer_${customerId}`;
    // }

    const handleSubmitCustomer = async (event) => {
        if (event) {
            event.preventDefault();

            if (name !== '' && address !== '') {

                // const id = generateUniqueId(); // You need to implement this function

                const i = {
                    // id: id,
                    name: name,
                    address: address,
                    details: details,
                    phone: phone,
                };

                try {
                    await axios.post('http://localhost:4000/customer/create', i);
                    console.log('Created Successful'); // Log success message
                    notification.success({
                        message: 'Customer Details Added Successfully',
                        description: 'You have successfully Added Customer to system',
                    });
                    history("/customer")

                } catch (error) {
                    console.error('Error creating item:', error);
                    // Handle the error, show an error message, or perform other actions as needed.
                }
            }
        }
    }



    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div
                style={{ marginLeft: 250 }}
            >

                <Card style={{ maxWidth: 800, padding: 10, margin: 20, alignContent: "center" }}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,

                        }}

                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>Product Details</h2>
                        <Divider />
                        <Form.Item
                            label="Item Name"
                            name="name"
                            on
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input
                                onChange={(e) => {
                                    setItems(e.target.value);
                                }}
                            />
                        </Form.Item>


                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <TextArea
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }} />


                        </Form.Item>

                        <Row>
                            <Col span={5} />
                            <Form.Item
                                name="date-picker"
                                label="DatePicker"

                            >
                                <DatePicker
                                    value={date ? dayjs(date, dateFormat) : null} // Use null if date is not set
                                    onChange={onChangeDate}
                                    format={dateFormat}
                                />

                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }} />
                            </Form.Item>

                        </Row>

                        <Row>
                            <Col span={9} />
                            <Col span={10}>
                                <Form.Item
                                    label="Quantity"
                                    name="qty"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input onChange={(e) => {
                                        setQty(e.target.value);
                                    }} />
                                </Form.Item>
                            </Col>
                        </Row>



                        <br></br>
                        <Row>
                            <Col span={14} />
                            <Form.Item>
                                <Button type="default" onClick={handleSubmit}>Submit</Button>
                            </Form.Item>

                        </Row>







                    </Form>

                </Card>

            </div>


            <div
                style={{ marginLeft: 250 }}


            >
                <Card style={{ maxWidth: 800, padding: 10, margin: 20, alignContent: "center" }}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h2 style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>Customer Details</h2>
                        <Divider />


                        <Form.Item
                            label="Customer ID"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input  onChange={(e) => {
                                    SetID(e.target.value);
                                }} />
                        </Form.Item>

                        <Form.Item
                            label="Customer name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                    setName(e.target.value);
                                }} />
                        </Form.Item>




                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <TextArea  onChange={(e) => {
                                    setAddress(e.target.value);
                                }} />
                        </Form.Item>
                        <Form.Item
                            label="Customer Details"
                            name="details"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <TextArea onChange={(e) => {
                                    setDetails(e.target.value);
                                }} />
                        </Form.Item>

                        <Form.Item
                            label="Mobile Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input onChange={(e) => {
                                    setPhone(e.target.value);
                                }}  />
                        </Form.Item>


                        {/* <Form.Item label="Product">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item> */}

                    </Form>
                    <Form.Item>
                        <Button type="default" onClick={handleSubmitCustomer}>Submit</Button>
                    </Form.Item>
                </Card>
            </div>

        </>
    )
}

export default Details;






