import React from "react";
import { Divider, Box, Typography } from "@mui/material";

const FinancialInformation = ({ companyData }) => {
    if (companyData?.estimated_revenue || companyData?.employee_count) {
        return (
            <Box elevation={3} sx={{ p: 2, borderRadius: 3, height: "100%" }}>
                <Typography variant="h6">Financial Information</Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                {companyData.estimated_revenue && (
                    <Typography sx={{ mt: 1 }} variant="body1">
                        Revenue: {companyData?.estimated_revenue}
                    </Typography>
                )}
                {companyData.employee_count && (
                    <Typography sx={{ mt: 1 }} variant="body1">
                        Employee Count: {companyData?.employee_count}
                    </Typography>
                )}
            </Box>
        );
    }
};

export default FinancialInformation;
