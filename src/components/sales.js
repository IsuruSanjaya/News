import React, { useState, useEffect, useContext } from 'react'
import { Space, Table, Input, Button, Card, Col, Row ,notification} from 'antd';
import { EditTwoTone, DeleteOutlined, SearchOutlined, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import logos from "../assets/images/logo (1).png"

import axios, { Axios } from 'axios';

const { Column, ColumnGroup } = Table;
const { Search } = Input;


const SalesBill = () => {

    const [sales, setSales]=useState([])
    const [searchText, setSearchText] = useState("");


    function getSales() {
        axios.get(`http://localhost:4000/sales/`)
          .then((res) => {
            setSales(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
      useEffect(() => {
        getSales();
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
            <h2>Customer Sales Details</h2>
          </div>         
           <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Description</th>
                    <th>Product</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${sales.map((item) => `
                    <tr>
                      <td>${item.id}</td>
                      <td>${item.name}</td>
                      <td>${item.description}</td>
                      <td>${item.product_s}</td>
                      <td>${item.price}</td>
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
        axios.delete("http://localhost:4000/sales/" + _id)
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
        await getSales();
    };

    const columns = [
        {
          title: 'Customer ID',
          dataIndex: 'id', // Replace with the actual key from your sales data
          key: 'id',
        },
        {
          title: 'Customer Name',
          dataIndex: 'name', // Replace with the actual key from your sales data
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description', // Replace with the actual key from your sales data
          key: 'description',
        },
        {
          title: 'Product',
          dataIndex: 'product_s', // Replace with the actual key from your sales data
          key: 'product_s',
        },
        {
          title: 'Price',
          dataIndex: 'price', // Replace with the actual key from your sales data
          key: 'price',
        },
        {
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

                <Table dataSource={sales} columns={columns} style={{ padding: 5, margin: 50 }}>
                    <Column title="Customer ID" dataIndex="lastName" key="lastName" />
                    <Column title="Customer Name" dataIndex="lastName" key="lastName" />
                    <Column title="Description" dataIndex="firstName" key="firstName" />
                    <Column title="Product" dataIndex="firstName" key="firstName" />
                    <Column title="Price" dataIndex="firstName" key="firstName" />



                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button>Delete</Button>
                                <Button>Edit</Button>
                                <Button>Print</Button>

                            </Space>
                        )} />
                </Table></Card>
        </>

    );

}

export default SalesBill;