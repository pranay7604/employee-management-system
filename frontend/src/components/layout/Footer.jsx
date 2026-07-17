import { Box, Divider, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 2,
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Divider />

      <Box
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Employee Management System
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Simplifying Employee & HR Operations
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            Version 1.0.0
          </Typography>

          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Pranay Mahajan
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;