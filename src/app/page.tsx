'use client'
import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import { BrowserRouter } from 'react-router-dom';
import {
  Table,
  TableContainer,
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';

const itemData = [
  {
    img: 'https://cdn.auxosoftware.com/wp-content/uploads/2023/10/03143031/ewof-preview-high-res.jpg',
    title: 'Bed',
  },
  {
    img: 'https://cdn.auxosoftware.com/wp-content/uploads/2023/08/18102120/preview-high-res.jpg',
    title: 'Kitchen',
  },
  {
    img: 'https://cdn.auxosoftware.com/wp-content/uploads/2022/09/30093853/header-image.jpg',
    title: 'Sink',
  },
];

interface Order {
  identifier: number;
  parts: Part[];
  total: number;
  status: string;
}

interface Part {
  identifier: number;
  description: string;
  price: number;
  quantity: number;
  stock: number;
}

var orders: Order[] = [];

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('https://localhost:55905/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data as Order[]);
      })
  }, [])

  return (
    <BrowserRouter>
    <Container>
      <ImageList sx={{ margin:"auto", paddingTop:"2%", marginLeft:"6%", marginRight:"6%"}} variant="woven" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=250&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=250&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography align="center" sx={{ paddingTop:"3.4%", justifyContent:"center" }} variant="h4" gutterBottom>
          Quality Auto Parts
        </Typography>
        <Typography  align="center" sx={{ justifyContent:"center"}} variant="h6" gutterBottom>
          Direct to you
        </Typography>
        <Typography  align="center" sx={{padding:"2%", justifyContent:"left"}} variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius duis at consectetur lorem donec massa sapien. Consequat nisl vel pretium lectus quam. Nec nam aliquam sem et. Nullam non nisi est sit amet facilisis. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Ac tortor vitae purus faucibus. Auctor urna nunc id cursus metus. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Nisi lacus sed viverra tellus in hac habitasse platea. At varius vel pharetra vel turpis nunc eget lorem dolor. Et odio pellentesque diam volutpat. Non consectetur a erat nam. In metus vulputate eu scelerisque felis imperdiet proin fermentum.
        </Typography>
        <Typography  align="center" sx={{paddingTop:"1%", justifyContent:"center"}} variant="h6" gutterBottom>
        Your Orders
        </Typography>
      <TableContainer 
            sx={{boxShadow:"2px 5px 5px rgba(0,0,0,.1)"}}>
        <Table>
          {/* Table content */}
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(orders).map(function(key: string, index: number) {
              var row: Order = orders[parseInt(key)];
              return (
                <TableRow key={row.identifier}>
                  <TableCell>{"#" + row.identifier}</TableCell>
                  <TableCell>{"$"+ row.total}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
    </Container>
    </BrowserRouter>
  );
}
