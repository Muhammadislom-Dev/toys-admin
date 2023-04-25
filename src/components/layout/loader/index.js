import React from "react";
import Grid from "@mui/material/Grid";
import "./loader.css";

const styles = {
  loaderContent: {
    margin: "0 auto",
    minHeight: 550,
    width: "60%",
    background: "#ffffff"
  }
};

const Loader = () => {
  return (
    <Grid
      sx={styles.loaderContent}
      justifyContent="center"
      container
      alignItems="center"
    >
      <div className="loader quantum-spinner" />
    </Grid>
  );
};

export default Loader;
