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
} from "../../assets/images";

import { MoreVert } from "@mui/icons-material";
import {
  OrderStatistics,
  InfoCard,
  BarChartBox,
  ProfileReportCard,
  BoxHeader,
} from "../../components";
import { formatNumber } from "../../utils/formatNumber";
import PieChartBox from "../../components/PieChartBox";
import StatsBox from "../../components/StatsBox";
import { useToggleDarkMode } from "../../contexts/themeContext";
import StatsTabs from "../../components/StatsTabs";
const transactionsInfo = [
  {
    id: 1,
    itemImg: transactionsImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 90.2,
  },
  {
    id: 2,
    itemImg: creditImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 90.2,
  },
  {
    id: 3,
    itemImg: transferImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 90.2,
  },
  {
    id: 4,
    itemImg: profitImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 90.2,
  },
  {
    id: 5,
    itemImg: walletImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 90.2,
  },
  {
    id: 6,
    itemImg: paymentsImg,
    subTitle: "Paypal",
    itemTitle: "Send money",
    total: 90.2,
  },
];
const StatsPage = () => {
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
              Congratulations Mr john! 🎉
            </Typography>
            <Typography my={3} maxWidth={"370px"} color="lightDark">
              You have done 72% 🤩 more sales today. Check your new raising
              badge in your profile.
            </Typography>
            <Button color="primary" size="small" variant="outlined">
              Secondary
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
          result={12687}
          info={"Profit"}
          percentage={72.8}
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
          result={4679}
          info={"Sales"}
          percentage={28.42}
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
          result={2468}
          info={"Payments"}
          percentage={-14.82}
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
          result={14857}
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
        <OrderStatistics totalSales={22600} />
        <Stack
          mb={5}
          gap={5}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography color="dark" variant="h4">
              {formatNumber(8258)}
            </Typography>
            <Typography variant="body2" color="lightDark">
              Total Orders
            </Typography>
          </Box>
          <PieChartBox />
        </Stack>
        <Stack direction="column" gap={3}>
          <StatsBox
            itemImg={paymentsImg}
            subTitle={"Paypal"}
            itemTitle={"Send money"}
            total={85.6}
          />
          <StatsBox
            itemImg={paymentsImg}
            subTitle={"Paypal"}
            itemTitle={"Send money"}
            total={85.6}
          />
          <StatsBox
            itemImg={paymentsImg}
            subTitle={"Paypal"}
            itemTitle={"Send money"}
            total={85.6}
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
        <BoxHeader title={"Transactions"} />
        <Stack direction="column" gap={3}>
          {transactionsInfo.map((transaction) => (
            <StatsBox key={transaction.id} {...transaction} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default StatsPage;
