import React from "react";
import {
    Box,
    Typography,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
const SocialMedia = ({ companyData}) => {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <Box sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6">
                Social Media and Online Presence
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            {companyData?.company_data?.alexa_rank && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Alexa Rank: {companyData?.company_data?.alexa_rank}
                </Typography>
            )}
            <Stack
                spacing={2}
                direction="row"
                useFlexGap
                flexWrap="wrap"
            >
                {companyData?.company_data?.facebook_url ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="dashboard"
                            onClick={() =>
                                openInNewTab(companyData?.company_data?.facebook_url)
                            }
                        >
                            <FacebookIcon />
                        </IconButton>
                        <Typography>Facebook</Typography>
                    </Box>
                ) : (
                    <></>
                )}

                {companyData?.company_data?.instagram_url ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="dashboard"
                            onClick={() =>
                                openInNewTab(companyData?.company_data?.instagram_url)
                            }
                        >
                            <InstagramIcon />
                        </IconButton>
                        <Typography>Instagram</Typography>
                    </Box>
                ) : (
                    <></>
                )}

                {companyData?.company_data?.linkedin_url ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="dashboard"
                            onClick={() =>
                                openInNewTab(companyData?.company_data?.linkedin_url)
                            }
                        >
                            <LinkedInIcon />
                        </IconButton>
                        <Typography>LinkedIn</Typography>
                    </Box>
                ) : (
                    <></>
                )}

                {companyData?.company_data?.twitter_url ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="dashboard"
                            onClick={() =>
                                openInNewTab(companyData?.company_data?.twitter_url)
                            }
                        >
                            <TwitterIcon />
                        </IconButton>
                        <Typography>Twitter</Typography>
                    </Box>
                ) : (
                    <></>
                )}
            </Stack>
            <Typography fontWeight={'500'} mt={3} mb={1}>
                Google summary reviews:
            </Typography>
            <Typography 
                sx={{ textJustify: "inter-word", textAlign: "justify" }}>
                {companyData?.reviews_summary}
            </Typography>
        </Box>
    );
};

export default SocialMedia;
