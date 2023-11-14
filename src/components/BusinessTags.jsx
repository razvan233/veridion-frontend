import React from "react";
import { Box, Typography, Divider, Chip, Stack } from "@mui/material";

const BusinessTags = ({ companyData }) => {
    return (
        <Box elevation={3} sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6">Business Tags and Industry</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Stack spacing={1} direction="row" useFlexGap flexWrap="wrap">
                {companyData?.business_tags.map(tag => (
                    <Chip key={tag} label={tag} />
                ))}
            </Stack>
        </Box>
    );
};

export default BusinessTags;
