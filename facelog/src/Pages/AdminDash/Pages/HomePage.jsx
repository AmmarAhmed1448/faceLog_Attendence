import React, { useContext } from "react";
import SideNav from "../Components/SideNav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import AChart from "../AdminCharts/AChart";
import PiChart from "../AdminCharts/PiChart";
import DataTable from "../Components/DataTable";
import { MyContext } from "../../../MyContext";

const HomePage = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const { text } = useContext(MyContext);
  return (
    <>
      <Box height={10} />
      <Box style={{ display: "flex", overflowX: "hidden" }}>
        <SideNav />
        <Box component="main" style={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Card
            variant="soft"
            style={{ margin: "10px", backgroundColor: "#091D36" }}
          >
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid
                xs={0}
                style={{
                  marginLeft: "20px",
                  fontSize: "40px",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                <span style={{fontSize: "1em", fontFamily: 'Bad Script, cursive' }}>DashBoard</span>

                
              </Grid>

              {/* remove start */}

              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid
                  xs={10.5}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "50px",
                    paddingTop: "90px",
                  }}
                >
                  <Stack spacing={2} direction="row">
                    <Card variant="plain">
                      <CardContent>
                        <Typography level="title-md" fontWeight="bold">
                          Present Days
                        </Typography>
                        <Typography style={{ textAlign: "center" }}>
                          {text.DaysPresent ? text.DaysPresent : "- - -"}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card variant="plain">
                      <CardContent>
                        <Typography level="title-md" fontWeight="bold">
                          Days Late
                        </Typography>
                        <Typography style={{ textAlign: "center" }}>
                          {text.DaysLate ? text.DaysLate : "- - -"}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card variant="plain">
                      <CardContent>
                        <Typography level="title-md" fontWeight="bold">
                          Days Absent
                        </Typography>
                        <Typography style={{ textAlign: "center" }}>
                          {text.DaysAbsent ? text.DaysAbsent : "- - -"}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card variant="plain">
                      <CardContent>
                        <Typography
                          level="title-md"
                          textColor="inherit"
                          fontWeight="bold"
                        >
                          Half Days
                        </Typography>
                        <Typography style={{ textAlign: "center" }}>
                          {text.HalfDays ? text.HalfDays : "- - -"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
                <Grid xs={4}></Grid>
                <Grid xs={4}></Grid>
                <Grid xs={8}></Grid>
              </Grid>
              {/* remove end */}
            </Grid>
            <Box height={20} />
            <Grid
              container
              spacing={0.2}
              sx={{ flexGrow: 1, marginLeft:"170px" }}
            >
              <Grid xs={4.5} style={{ margin: "30px" }}>
                <Card
                  variant="solid"
                  sx={{
                    padding: "30px",
                    height: 50 + "vh",
                    backgroundColor: "#16344F",
                  }}
                >
                  <CardContent>
                    <AChart></AChart>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                xs={4.5}
                style={{
                  margin: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Card
                  variant="solid"
                  sx={{
                    padding: "30px",
                    height: 50 + "vh",
                    backgroundColor: "#16344F",
                    // marginT
                  }}
                >
                  <CardContent>
                    <PiChart />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* data table start */}
            <DataTable />
            {/* data table end */}
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
