import React, { useState, useEffect, useContext } from 'react'
import { Space, Table, Input, Button, Card, Col, Row } from 'antd';
import { EditTwoTone, DeleteOutlined, SearchOutlined, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import logos from "../assets/images/logo (1).png"

import axios, { Axios } from 'axios';
import { notification } from 'antd';

const { Column, ColumnGroup } = Table;
const { Search } = Input;


const Customer = () => {
    const [searchText, setSearchText] = useState("");
    const [customer, setCustomer] = useState([]);

    function getCustomer() {
        axios.get(`phoneplanetbackend.azurewebsites.net/customer/`)
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
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  ${customer.map((item) => `
                    <tr>
                    <td>${item.orderNumber}</td>
                      <td>${item.name}</td>
                      <td>${item.address}</td>
                      <td>${item.phone}</td>
                      <td>${item.details}</td>
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

        printWindow.document.open();
        printWindow.document.write(contentToPrint);
        printWindow.document.close();

        printWindow.print();
    };

    const handleDeleteConfirm = async (_id) => {
        axios.delete("http://localhost:4000/customer/" + _id)
            .then((result) => {
                notification.success({
                    message: 'Deleted Successful',
                    description: 'You have successfully Deleted Report',
                });
                // setIsDeleteModalOpen(false); // Hide the delete modal
                refresh();
            }).catch((err) => {
                console.log(err);
            })
    };

    const refresh = async () => {
        await getCustomer();
    };
    const columns = [
        {
            title: 'Customer ID',
            dataIndex: 'orderNumber', // Replace with the actual key from your sales data
            key: 'orderNumber',
        },
        {
            title: 'Customer Name',
            dataIndex: 'name', // Replace with the actual key from your sales data
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address', // Replace with the actual key from your sales data
            key: 'address',
        },
        {
            title: 'Mobile No',
            dataIndex: 'phone', // Replace with the actual key from your sales data
            key: 'phone',
        },
        {
            title: 'Details',
            dataIndex: 'details', // Replace with the actual key from your sales data
            key: 'details',
        }, {
            title: "",
            key: "actions",
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditTwoTone key={record._id} />} onClick={() => {
                        // setIsEditModalOpen(true);
                        // setSelectedItem(record)
                    }}>
    
                    </Button>
                    <Button icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onClick={() => {
                            handleDeleteConfirm(record._id);
                            // refresh();
    
                        }}
                    />
                </Space>
            ),
        }

    ];

    return (
        <>
            <Card style={{ padding: 10 }}>
                <h2 style={{ fontSize: 20, padding: 20, textAlign: "center", fontWeight: "bold" }}>
                    Customer Details</h2>
                <Row>
                    <Col span={15} />
                    <div>
                        <Search
                            placeholder="input search text"
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{
                                width: 250,
                            }}
                        />
                        <Button icon={<FilePdfOutlined style={{ fontSize: '21px', color: 'red' }} />} onClick={handlePrint} />

                    </div>
                </Row>

                <Table dataSource={customer} columns={columns} style={{ padding: 5, margin: 50 }}>
                    {/* <Column title="Customer ID" dataIndex="orderNumber" key="orderNumber" />
                    <Column title="Customer Name" dataIndex="name" key="name" />
                    <Column title="Address" dataIndex="address" key="address" />


                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button>Delete</Button>
                                <Button>Edit</Button>
                                <Button>Print</Button>

                            </Space>
                        )} /> */}
                </Table></Card>
        </>

    );

}

export default Customer;