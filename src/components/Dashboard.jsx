import React from "react";
import { Box, Paper } from "@mui/material";
import CompanyIdentification from "./CompanyIdentification";
import ContactInformation from "./ContactInformation";
import FinancialInformation from "./FinancialInformation";
import { useLocation } from "react-router-dom";
import SocialMedia from "./SocialMedia";
import BusinessTags from "./BusinessTags";
import LocationsMap from "./LocationsMap";
const Dashboard = () => {
    const location = useLocation();
    const companyData = location.state?.companyData;
    return (
        <Paper
            sx={{
                mt: 5,
                px: 3,
                py: 5,
                width: "90vw",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 3,
                mb:5,
            }}
            elevation={5}
        >
            <Box spacing={2} alignItems={"stretch"}>
                <CompanyIdentification companyData={companyData?.company_data} />
                <BusinessTags companyData={companyData?.company_data} />
                <LocationsMap locations={companyData?.company_data?.locations}/>
                <FinancialInformation companyData={companyData?.company_data} />
                <SocialMedia companyData={companyData} />
                <ContactInformation companyData={companyData?.company_data} />
            </Box>
        </Paper>
    );
};

export default Dashboard;
