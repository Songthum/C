import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';

function UploadLinkTranscript1() {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null); // State for the uploaded file
  const [files, setFiles] = useState([null]); // Array to hold uploaded files
  const [students, setStudents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9999/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (index) => (e) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
    setUploadedFile(newFiles[index]); // Set the uploaded file for display
  };
  

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:9999/files', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully:', data);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Container>
                <h1>ตรวจสอบคุณสมบัติยื่นโครงงานพิเศษ 2 (ปริญญานิพนธ์)</h1>
                <h2>เกณฑ์การประเมิน</h2>
                <p>
                  นักศึกษาโครงการพิเศษสองภาษาต้องลงทะเบียนเรียนวิชา 040613141 Special Project I
                  ได้ผลการเรียนรวม ≥ 102 หน่วยกิต และได้ผลการเรียนรายวิชาภาคฯ 0406xxxxx ≥ 57 หน่วยกิต
                  โดยใช้เอกสารใบรับรองผลการศึกษา (Transcript)
                </p>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{ marginTop: 1 }}
                    fontSize={'18px'}
                  >
                    อัปโหลดไฟล์ผลการเรียนจากเว็บไซต์ reg kmutnb
                  </Typography>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{ maxWidth: 180, m: 2 }}
                  >
                    Upload file
                    <input type="file" onChange={handleFileChange} />
                  </Button>

                  {uploadedFile && ( // Display the uploaded file name
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                      Uploaded file: {uploadedFile.name}
                    </Typography>
                  )}

                  <Grid sx={{ textAlign: 'center' }}>
                    <Button variant="contained" onClick={handleFileUpload} sx={{ maxWidth: 100 }}>
                      ตรวจสอบ
                    </Button>
                  </Grid>
                </Box>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>ตรวจสอบคุณสมบัติยื่นสอบ</DialogTitle>
                  <DialogContent>
                    <p>ผลการตรวจสอบ</p>
                    {uploadedFile && (
                      <Typography variant="body2">
                        File: {uploadedFile.name}
                      </Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                  </DialogActions>
                </Dialog>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default UploadLinkTranscript1;
