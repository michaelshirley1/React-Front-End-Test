'use client';
import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { BrowserRouter } from 'react-router-dom';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

interface Part {
  identifier: number;
  description: string;
  price: number;
  quantity: number;
}

const PartsPage: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    fetch('https://localhost:55905/parts')
      .then((res) => res.json())
      .then((data) => {
        setParts(data);
      })
      .catch((error) => {
        console.error('Error fetching parts:', error);
      });
  }, []);

  return (
    <BrowserRouter>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount in Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(parts).map(function(key: string, index: number) {
            var row: Part = parts[parseInt(key)];
            return (
              <TableRow key={row.identifier}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </BrowserRouter>
  );
};

export default PartsPage;
