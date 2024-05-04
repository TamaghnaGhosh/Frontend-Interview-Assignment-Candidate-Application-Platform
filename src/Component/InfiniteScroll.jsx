import { useEffect, useState } from "react";
import { myHeadersConstant } from "../utils/constant";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import SimpleCard from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../utils/Redux/appSlice";
import InfiniteScroll from "react-infinite-scroll-component";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "0 20px",
  },
}));

const InfiniteScrollwithFilters = () => {
  const jobs = useSelector((store) => store?.jobinfo?.jobs);

  const [getData, setGetData] = useState(jobs);
  const [limit, setLimit] = useState(4);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    fetchGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const body = JSON.stringify({
    limit: 10,
    offset: 0,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeadersConstant,
    body,
  };

  const fetchGetData = async () => {
    try {
      const info = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      console.log(
        "🚀 ~ fetchGetData ~ info?.data?.jdList?.slice(0, limit):",
        info?.data?.jdList?.slice(0, limit)
      );
      setGetData(info?.data?.jdList?.slice(0, limit));
      dispatch(getJobs(info?.data?.jdList));
    } catch (error) {
      console.error(error.message);
    }
  };

  const FeatchMoreData = () => {
    if (getData?.length < 10) {
      setTimeout(() => {
        console.log(limit);
        setLimit(limit + 2);
      }, 1500);
    } else {
      setHasMore(false);
    }
  };
  console.log("🚀 ~ FeatchMoreData ~ getData?.length:", getData?.length);

  return (
    <InfiniteScroll
      dataLength={getData.length}
      next={FeatchMoreData}
      hasMore={hasMore}
      loader={<h1>loading...</h1>}
      endMessage={
        <p style={{ textAlign: "center", fontSize: "50px" }}>
          you are all set!
        </p>
      }
    >
      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justifyContent="center"
      >
        {getData?.map((item) => (
          <Grid item xs={12} sm={2} md={6} key={item?.jdUid}>
            <SimpleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default InfiniteScrollwithFilters;
