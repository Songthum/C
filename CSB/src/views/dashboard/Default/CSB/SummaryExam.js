import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SummaryExam = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]); // State to hold unique dates
  const [selectedDate, setSelectedDate] = useState('');
  const printRef = useRef(); // Reference to the component for printing

  useEffect(() => {
    // Fetch data from the Room API
    axios.get('http://localhost:9999/Room') // Updated to your API URL
      .then(response => {
        // Sort data by R_Time in descending order before setting it to state
        const sortedData = response.data.sort((a, b) => new Date(b.R_Time) - new Date(a.R_Time));
        setData(sortedData);
        setFilteredData(sortedData); // Initialize filtered data

        // Extract unique R_Date values for the select dropdown
        const dates = [...new Set(sortedData.map(item => item.R_Date))]; // Get unique R_Date
        setUniqueDates(dates); // Update unique dates state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePrint = () => {
    window.print(); // Trigger browser's print dialog
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    
    if (newDate) {
      const filtered = data.filter(item => item.R_Date === newDate);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to all data if no date is selected
    }
  };

  return (
    <>
      {/* Styling for print to ensure only table content is printed */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
            .print-button {
              display: none;
            }
          }
        `}
      </style>

      {/* The content that will be printed */}
      <div ref={printRef} className="print-area">
        <TableContainer component={Paper} elevation={3}>
          <Typography variant="h2" align="center" gutterBottom><br />
            Exam Room Summary<br />
            ข้อมูลสำหรับออกเอกสาร<br /><br />
            <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
              <InputLabel>เลือกวันที่</InputLabel>
              <Select
                value={selectedDate}
                onChange={handleDateChange}
                label="เลือกวันที่"
              >
                <MenuItem value=""><em>ทั้งหมด</em></MenuItem>
                {uniqueDates.map((date, index) => (
                  <MenuItem key={index} value={date}>{date}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
          <Table>
          <TableHead>
              <TableRow>
                <TableCell align="center">เลขห้องสอบ</TableCell>
                <TableCell align="center">ประเภทการสอบ</TableCell>
                <TableCell align="center">ประธานกรรมการ</TableCell>
                <TableCell align="center">กรรมการ</TableCell>
                <TableCell align="center">ชื่อโปรเจกต์</TableCell>
                <TableCell align="center">เวลาสอบ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{item.R_id}</TableCell>
                  <TableCell align="center">{item.R_name}</TableCell>
                  <TableCell align="center">{item.R_C}</TableCell>
                  <TableCell align="center">
                    {Array.isArray(item.R_T) && item.R_T.length > 0 ? (
                      item.R_T.map((teacher, idx) => (
                        <div key={idx}>{teacher}</div>
                      ))
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    {Array.isArray(item.R_P) && item.R_P.length > 0 ? (
                      item.R_P.map((project, idx) => (
                        <div key={idx}>{`${idx + 1}. ${project}`}</div> // Add numbering here
                      ))
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {Array.isArray(item.R_Time) && item.R_Time.length > 0 ? (
                      item.R_Time.map((time, idx) => (
                        <div key={idx}>{time}</div>
                      ))
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Print Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            className="print-button"
            style={{ marginTop: '20px' }}
          >
            พิมพ์เอกสาร
          </Button>
        </TableContainer>
      </div>
    </>
  );
};

export default SummaryExam;