import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import api from "../utils/api";
import { useSnackbar } from "notistack";
import { API_ENDPOINTS } from "../utils/vars";
import { useNavigate } from "react-router-dom";
import {FillingBottle} from 'react-cssfx-loading'
const CompanyForm = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        legal_names: [],
        commercial_names: [],
        address_txt: "",
        phone_number: "",
        website: "",
    });
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'legal_names' || name === 'commercial_names' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.commercial_names.length & !formData.legal_names.length) {
            enqueueSnackbar("Please fill in all required fields.", {
                variant: "warning",
            });
            return;
        }
        try {
            
            setIsLoading(true)
            const response = await api.post(API_ENDPOINTS.ENRICH_COMPANY, formData);
            console.log(response.data);
            navigate("/dashboard", { state: {companyData : response.data} })
            enqueueSnackbar("Company information submitted successfully!", {
                variant: "success",
            });
        } catch (error) {
            console.error("There was an error!", error);
            enqueueSnackbar("Failed to submit company information.", {
                variant: "error",
            });
        } finally{
            setIsLoading(false)
        }
    };
    if(isLoading){
        return <Box sx={{display:'flex' , height:'100vh', alignItems:'center',justifyContent:'center'}}>
            <FillingBottle color="#556cd6" width="100px" height="100px"/>
        </Box>
    }
    return (
        <Paper
            sx={{
                maxWidth: {
                    xs:360,
                    md:560
                },
                mx: "auto",
                mt: 5,
                p: 3,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
            }}
            
            component={"form"}
            elevation={3}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                Company information
            </Typography>
            <TextField
                margin="normal"
                fullWidth
                label="Legal names"
                name="legal_names"
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Commercial names"
                name="commercial_names"
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Address"
                name="address_txt"
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Phone number"
                name="phone_number"
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Website"
                name="website"
                onChange={handleChange}
            />
            <Button
                sx={{ mt: 2, alignSelf: "flex-end", px: 8 }}
                variant="contained"
                type="submit"
                size="large"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Paper> 
    );
};

export default CompanyForm;
