import React, { useState } from "react";
import {
    Box,
    Typography,
    Divider,
    IconButton,
    Popover,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";

const ContactInformation = ({ companyData }) => {
    const [anchorElPhone, setAnchorElPhone] = useState(null);
    const [anchorElEmail, setAnchorElEmail] = useState(null);

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };
    const googleMapLink = (company, lat, long) => {
        const link = `https://www.google.com/maps/search/${company}/@${lat},${long},18z?hl=en&radius=10km`;
        openInNewTab(link);
    };
    const handleClickPhone = (event) => {
        setAnchorElPhone(event.currentTarget);
    };

    const handleClosePhone = () => {
        setAnchorElPhone(null);
    };

    const handleClickEmail = (event) => {
        setAnchorElEmail(event.currentTarget);
    };

    const handleCloseEmail = () => {
        setAnchorElEmail(null);
    };

    const openPhone = Boolean(anchorElPhone);
    const openEmail = Boolean(anchorElEmail);

    return (
        <Box elevation={3} sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6">Contact Information</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Typography sx={{ mt: 1 }} variant="body1">
                {companyData?.main_country}, {companyData?.main_city}{" "}
                {companyData?.main_street} {companyData?.main_street_number}
                <IconButton
                    size="small"
                    onClick={() =>
                        googleMapLink(
                            companyData?.company_legal_names[0],
                            companyData.main_latitude,
                            companyData.main_longitude
                        )
                    }
                >
                    <PlaceIcon fontSize="inherit" />
                </IconButton>
            </Typography>
            {companyData?.primary_email && (
                <Typography sx={{ mt: 1 }} variant="body1">
                    {companyData?.primary_email}
                    <IconButton size="small" onClick={handleClickEmail}>
                        <EmailIcon fontSize="inherit" />
                    </IconButton>
                    <Popover
                        open={openEmail}
                        anchorEl={anchorElEmail}
                        onClose={handleCloseEmail}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <List>
                            {companyData?.other_emails?.map((email, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={email} />
                                </ListItem>
                            ))}
                        </List>
                    </Popover>
                </Typography>
            )}
            {companyData?.primary_phone && (
                <Typography sx={{ mt: 1 }} variant="body1">
                    {companyData?.primary_phone}
                    <IconButton size="small" onClick={handleClickPhone}>
                        <PhoneIcon fontSize="inherit" />
                    </IconButton>
                    <Popover
                        open={openPhone}
                        anchorEl={anchorElPhone}
                        onClose={handleClosePhone}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        sx={{ borderRadius: 5 }}
                    >
                        <List>
                            {companyData?.phone_numbers?.map((phone, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={phone} />
                                </ListItem>
                            ))}
                        </List>
                    </Popover>
                </Typography>
            )}
            {companyData?.website_url && (
                <Typography mt={1}>
                    {companyData?.website_domain
                        ? companyData.website_domain
                        : companyData?.website_url}
                    <IconButton
                        size="small"
                        onClick={() => openInNewTab(companyData?.website_url)}
                    >
                        <LanguageIcon fontSize="inherit" />
                    </IconButton>
                </Typography>
            )}
        </Box>
    );
};

export default ContactInformation;
