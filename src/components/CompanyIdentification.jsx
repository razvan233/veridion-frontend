import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const CompanyIdentification = ({ companyData }) => {
    return (
        <Box elevation={3} sx={{ p: 2, borderRadius: 3, height: "100%", }}>
            <Typography variant="h4" fontWeight={'bold'} sx={{
                fontSize:{
                    xs:22,
                    md:'2.125rem'
                }
            }}>
                {companyData?.company_legal_names[0]} founded in {companyData?.year_founded}
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Typography
                variant="subtitle1"
                sx={{ textJustify: "inter-word", textAlign: "justify",  }}
            >
                {companyData?.long_description}
            </Typography>
        </Box>
    );
};

export default CompanyIdentification;
