import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Select, Card, Row, Col, Divider } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import Navigation from '../common/Navigation';
import axios, { Axios } from 'axios';
import { notification } from 'antd';

const { TextArea } = Input;

const dateFormat = 'YYYY/MM/DD';



const SalesDetails = () => {

  const [customer, setCustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [product_s, setitems] = useState('');
  const [price, setprice] = useState('');
  const [qty, setqty] = useState('');
  const [id, setcusid] = useState('');


  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');

    const contentToPrint = `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #ddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
            .header {
              text-align: center;
              padding: 10px;
            }
            .logo {
              max-width: 100px;
              height: auto;
            }
            title {
              display: none; /* Hide the title */
            }
          </style>
        </head>
        <body>
        <div class="header">
        <img src="${logos}" alt="Company Logo" class="logo" /> 
        <h2>Product Details</h2>
      </div>         
       <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${product.map((item) => `
                <tr>
                  <td>${item.item}</td>
                  <td>${item.description}</td>
                  <td>${item.price}</td>
                  <td>${item.qty}</td>
                  <td>${item.date}</td>

                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        <script>
        window.onload = function() {
          window.print();
        }
      </script>
      </html>
    `;

    const handleSubmit = async (event) => {
      if (event) {
        event.preventDefault();

        if (name !== '' && description !== '') {
          const i = {
            id: id,
            name: name,
            description: description,
            price: price,
            qty: qty,
            product_s: product_s,
          };

          try {
            await axios.post('http://localhost:4000/sales/create', i);
            console.log('Created Successful'); // Log success message
            notification.success({
              message: 'Successfully Added',
              description: 'You have successfully Added Customer',
            });
          } catch (error) {
            console.error('Error creating item:', error);
            // Handle the error, show an error message, or perform other actions as needed.
          }
        }
      }
    }

    function getCustomer() {
      axios.get(`http://localhost:4000/customer/`)
        .then((res) => {
          setCustomer(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    useEffect(() => {
      getCustomer();
    }, [])

    function getProduct() {
      axios.get(`http://localhost:4000/items/`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    useEffect(() => {
      getProduct();
    }, [])


    const onFinish = (values) => {
      console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    // Function to handle customer selection
    const handleCustomerSelect = (value) => {
      // Find the selected customer based on the selected name
      const foundCustomer = customer.find((customerData) => customerData.name === value);
      setSelectedCustomer(foundCustomer);
      setname(foundCustomer ? foundCustomer.name : '');
      setcusid(foundCustomer ? foundCustomer.orderNumber : '');

    };

    // Function to handle customer selection
    const handleProductSelect = (value) => {
      // Find the selected customer based on the selected name
      const foundProduct = product.find((productdata) => productdata.item === value);
      setSelectedProduct(foundProduct);
      setitems(foundProduct ? foundProduct.item : '');
      setprice(foundProduct ? foundProduct.price : '');


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
                span: 18,
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


              <Form.Item label="Customer ID">
                <Input value={selectedCustomer ? selectedCustomer.orderNumber : ''} readOnly onChange={(e) => {
                  setcusid(e.target.value);
                }} />
              </Form.Item>

              <Form.Item
                label="Customer Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please select a customer name!',
                  },
                ]}
              >
                <Select onChange={handleCustomerSelect} >
                  {customer.map((customerData) => (
                    <Select.Option key={customerData._id} value={customerData.name}>
                      {customerData.name}
                    </Select.Option >
                  ))}
                </Select >
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
                <TextArea onChange={(e) => {
                  setdescription(e.target.value);
                }} />
              </Form.Item>

              <Form.Item label="Product">
                <Select onChange={handleProductSelect}>
                  {product.map((productdata) => (
                    <Select.Option key={productdata._id} value={productdata.item}>
                      {productdata.item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Row>
                <Col span={5} />

                <Col span={10}>
                  <Form.Item
                    label="Price"

                  >
                    <Input value={selectedProduct ? selectedProduct.price : ''} readOnly onChange={(e) => {
                      setprice(e.target.value);
                    }} />
                  </Form.Item>


                </Col>

              </Row>
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
                  setqty(e.target.value);
                }} />
              </Form.Item>

            </Form>


            <Row>
              <Col span={15} />

              <Form.Item>
                <Button type="default" onClick={handleSubmit}>Submit</Button>
              </Form.Item>
            </Row>
          </Card>

        </div>

      </>
    )
  }
}
  export default SalesDetails;