import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  manWithLaptopImg,
  manWithLaptopImgDark,
  transactionsImg,
  paymentsImg,
  salesImg,
  profitImg,
  creditImg,
  transferImg,
  walletImg,
  bagImg,
  javaScript,
  javaScriptImg,
  reactImg,
  nestJsImg,
} from "../../assets/images";

import { MoreVert } from "@mui/icons-material";
import {
  OrderStatistics,
  InfoCard,
  BarChartBox,
  ProfileReportCard,
  BoxHeader,
  StatsBox,
  PieChartBox,
  StatsTabs,
} from "../../components";
import { formatNumber } from "../../utils";
import { useToggleDarkMode } from "../../contexts/themeContext";
import { useAuth } from "../../contexts/authContext";
import withHelmet from "../../components/withHelmet";
const transactionsInfo = [
  {
    id: 1,
    itemImg: paymentsImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 82.6,
  },
  {
    id: 2,
    itemImg: creditImg,
    subTitle: "Credit Card",
    itemTitle: "Equipments",
    total: 450.72,
  },
  {
    id: 3,
    itemImg: transferImg,
    subTitle: "Transfer",
    itemTitle: "Salaries",
    total: formatNumber(15000),
  },
  {
    id: 4,
    itemImg: profitImg,
    subTitle: "Expenses",
    itemTitle: "Labors",
    total: formatNumber(12500),
  },
  {
    id: 5,
    itemImg: walletImg,
    subTitle: "Wallet",
    itemTitle: "Courses",
    total: 270.69,
  },
  {
    id: 6,
    itemImg: transactionsImg,
    subTitle: "withdrawals",
    itemTitle: "withdrawal of funds",
    total: 520,
  },
];
const StatsPage = () => {
  const { auth } = useAuth();

  const { colorMode } = useToggleDarkMode();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(6, 1fr)",
        },
        gridAutoRows: "minmax(150px, max-content)",
        gap: 1,
      }}
    >
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        gridColumn={{ md: "span 6", lg: "span 4" }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "stretch" }}
          height="100%"
        >
          <Box p={2} flex={2} sx={{ order: { xs: "1", md: "0" } }}>
            <Typography fontWeight="bold" color="primary.main" variant="h5">
              Congratulations {auth?.user.username}🎉
            </Typography>
            <Typography my={3} maxWidth={"370px"} color="lightDark">
              You have done 72% 🤩 more sales today. Check your wallet
            </Typography>
            <Button color="primary" size="small" variant="outlined">
              Wallet
            </Button>
          </Box>
          <Box display="flex" flex={1} sx={{ mt: { xs: "15px", md: "0px" } }}>
            <img
              style={{
                height: "175px",
                alignSelf: "flex-end",
              }}
              src={
                colorMode === "light" ? manWithLaptopImg : manWithLaptopImgDark
              }
              alt=""
            />
          </Box>
        </Stack>
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        gridColumn={{ md: "span 2", lg: "span 1" }}
      >
        <InfoCard
          img={profitImg}
          result={87837}
          info={"Profit"}
          percentage={87.8}
        />
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        gridColumn={{ md: "span 2", lg: "span 1" }}
      >
        <InfoCard
          img={salesImg}
          result={2300}
          info={"Sales"}
          percentage={47.42}
        />
      </Box>

      <Box
        p={3}
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        gridColumn={{ md: "span 6", lg: "span 4" }}
        gridRow={{ lg: "span 2" }}
        sx={{
          gridRowStart: { xs: "7", md: "4" },
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography variant="h5" color="dark">
            Total Revenue
          </Typography>
          <IconButton size="medium">
            <MoreVert fontSize="20px" />
          </IconButton>
        </Stack>

        <Stack alignItems="center" direction={{ xs: "column", md: "row" }}>
          <BarChartBox />
        </Stack>
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        gridColumn={{ md: "span 2", lg: "span 1" }}
      >
        <InfoCard
          img={paymentsImg}
          result={6613}
          info={"Payments"}
          percentage={-7}
        />
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        gridColumn={{ md: "span 2", lg: "span 1" }}
      >
        <InfoCard
          img={transactionsImg}
          result={28824}
          info={"Transactions"}
          percentage={28.14}
        />
      </Box>

      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        p={2}
        gridColumn={{ md: "span 4", lg: "span 2" }}
      >
        <ProfileReportCard />
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        p={2}
        gridColumn={{ md: "span 3", lg: "span 2" }}
      >
        <OrderStatistics totalSales={2300} />
        <Stack
          mb={5}
          gap={{ md: 3, lg: 2, xl: 5 }}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography color="dark" variant="h4">
              {formatNumber(2078)}
            </Typography>
            <Typography variant="body2" color="lightDark">
              Total Orders
            </Typography>
          </Box>
          <PieChartBox />
        </Stack>
        <Stack direction="column" gap={3}>
          <StatsBox
            itemImg={reactImg}
            subTitle={"React"}
            itemTitle={"Received money"}
            total={826.5}
          />
          <StatsBox
            itemImg={javaScriptImg}
            subTitle={"Javascript"}
            itemTitle={"Received money"}
            total={566.7}
          />
          <StatsBox
            itemImg={nestJsImg}
            subTitle={"nest Js"}
            itemTitle={"Received money"}
            total={343.6}
          />
        </Stack>
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        p={2}
        gridColumn={{ md: "span 3", lg: "span 2" }}
      >
        <StatsTabs />
      </Box>
      <Box
        bgcolor="background.paper"
        borderRadius={2}
        className="shadow-1"
        p={2}
        gridColumn={{ md: "span 3", lg: "span 2" }}
      >
        <Box mb={8}>
          <BoxHeader title={"Transactions"} />
        </Box>
        <Stack direction="column" gap={6}>
          {transactionsInfo.map((transaction) => (
            <StatsBox key={transaction.id} {...transaction} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default withHelmet(StatsPage, "Statistics");
