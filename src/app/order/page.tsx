'use client'
import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import { BrowserRouter } from 'react-router-dom';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

interface Part {
  identifier: number;
  description: string;
  price: number;
  quantity: number;
  orderedQuantity: number;
}

const OrderPage: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [orderParts, setOrderParts] = useState<Part[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetch('https://localhost:55905/parts')
      .then((res) => res.json())
      .then((data) => {
        setParts(data);
      })
  }, [])

  useEffect(() => {
    updateTotal();
  }, [orderParts]);

  const submitOrder = async () => {
    const response = await fetch('https://localhost:55905/parts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(orderParts),
    });
    return await response.json();
  };

  const updateQuantity = (part: Part, quantity: number) => {
    part.orderedQuantity = quantity;
    if (quantity === 0) {
      setOrderParts(orderParts.filter((item) => item !== part));
    }
    updateTotal();
  }

  const updateTotal = () => {
    let newTotal = 0;
    for (let i = 0; i < orderParts.length; i++) {
      newTotal += orderParts[i].price * orderParts[i].orderedQuantity;
    }
    setTotal(Number(newTotal.toFixed(2)));
  };

  const addPart = (part: Part) => {
    if (!orderParts.includes(part)) {
      setOrderParts((prevOrderParts) => {
        const updatedOrderParts = [...prevOrderParts, part];
        updateQuantity(part, 1);
        return updatedOrderParts;
      });
    }
  };

  return (
    <BrowserRouter>
    <div>
      <Stack direction="row">
        <TableContainer sx={{ boxShadow: '5px 30px 40px rgba(0,0,0,.1)', marginRight: '1%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderParts.map(row => (
                <TableRow key={row.identifier}>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{`$${row.price}`}</TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-number"
                      label=""
                      type="number"
                      onChange={(event) => updateQuantity(row, parseInt(event.target.value))}
                      defaultValue={row.orderedQuantity}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ boxShadow: '5px 30px 40px rgba(0,0,0,.1)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(parts).map(function(key: string, _: number) {
                var row: Part = parts[parseInt(key)];
                return (
                  <TableRow key={row.identifier}>
                    <TableCell>
                      <Button onClick={() => addPart(row)}>
                        <AddIcon />
                      </Button>
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{Number(row.price.toFixed(2))}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Stack>
      <Grid sx={{ padding: '1%' }} justifyContent="space-between" container spacing={24}>
        <Grid item>
          <Typography variant="h6" component="div">
            Total: ${total}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ float: 'right' }}
            variant="contained"
            color="success"
            onClick={submitOrder}
            endIcon={<SendIcon />}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </div>
    </BrowserRouter>
  );
};

export default OrderPage;


