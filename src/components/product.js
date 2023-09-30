import React, { useState, useEffect, useRef } from 'react'
import { Space, Table, Input, Button, Card, Col, Select, Row } from 'antd';
import { EditTwoTone, DeleteOutlined, SearchOutlined, DownloadOutlined, FilePdfOutlined, FilePdfTwoTone, SelectOutlined, MessageOutlined } from '@ant-design/icons';
import { useReactToPrint } from "react-to-print";
import logos from "../assets/images/logo (1).png"
import axios, { Axios } from 'axios';
import { notification } from 'antd';



const { Column, ColumnGroup } = Table;
const { Search } = Input;


const PrintComponent = ({ data }) => {
  return (
    <Card style={{ padding: 10 }}>
      <h2 style={{ fontSize: 20, padding: 20, textAlign: 'center', fontWeight: 'bold' }}>
        Product Details
      </h2>
      <Table dataSource={data} style={{ margin: 40 }}>
        {/* Your table columns and data */}
      </Table>
    </Card>
  );
};
const Product = () => {
  const [product, setProduct]=useState([])

  const componentRef = useRef();

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

    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();

    printWindow.print();
  };
  const [searchText, setSearchText] = useState("");

  const handleDeleteConfirm = async (_id) => {
    axios.delete("http://localhost:4000/items/" + _id)
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
    await getProduct();
};
  const columns = [
    {
        title: 'Product Name',
        dataIndex: 'item', // Replace with the actual key from your sales data
        key: 'item',
    },
    {
        title: 'Description',
        dataIndex: 'description', // Replace with the actual key from your sales data
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price', // Replace with the actual key from your sales data
        key: 'price',
    },
    {
        title: 'Quantity',
        dataIndex: 'qty', // Replace with the actual key from your sales data
        key: 'qty',
    },
    {
        title: 'Date',
        dataIndex: 'date', // Replace with the actual key from your sales data
        key: 'date',
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
  return (
    <>

      <Card style={{ padding: 5 }}>
        <h2 style={{ fontSize: 20, padding: 20, textAlign: "center", fontWeight: "bold" }}>
          Product Details</h2>
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

        <Table dataSource={product} columns={columns} style={{ margin: 40 }}>

          {/* <Column title="Items" dataIndex="firstName" key="firstName" />
          <Column title="Description" dataIndex="lastName" key="lastName" />
          <Column title="Date" dataIndex="firstName" key="firstName" />
          <Column title="Price" dataIndex="address" key="address" />
          <Column title="Quantity" dataIndex="key" key="address" />
          <Column title="Status" dataIndex="address" key="address" />


          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button>Delete</Button>
                <Button>Edit</Button>

              </Space>
            )} /> */}
        </Table>

      </Card>


    </>

  );

}

export default Product;