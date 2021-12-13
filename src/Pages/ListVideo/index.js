import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../Components/Header";
import InfiniteScroll from "../../Components/InfiniteScroll";
import Carousel from "../../Components/Carousel";
import MovieCarousel from "../../Components/Videos/Carousel";
import Footer from "../../Components/Footer";
import { StyledDisplay, StyledContainer } from "./styles.js";
import api from "../../Services/api";
import "react-awesome-slider/dist/styles.css";

const ListVideo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, _setData] = useState({
    run_next_page: false,
    next_page_url: "",
    videos: [],
    categories: [],
  });
  const dataRef = useRef(data);

  const setData = data => {
    dataRef.current = data;
    _setData(data);
  };

  const getIndex = (array, video) => {
    return array.findIndex(finding => finding.category === video.category);
  };

  useEffect(() => {
    api
      // .get("/videos")
      .get("/videos?page=1&items=150")
      .then(response => {
        const videos = response.data.data;
        const categories = [];
        videos.forEach(video => {
          let index = getIndex(categories, video);
          if (index === -1) {
            categories.push({ category: video.category, videos: [] });
            index = getIndex(categories, video);
          }
          categories[index].videos.push(video);
        });
        setData({
          run_next_page: true,
          next_page_url: response.data.meta.next_page_url,
          videos: videos,
          categories: categories,
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const nextPage = useCallback(async () => {
    setIsLoading(true);
    const hasNext = dataRef.current.next_page_url !== null;
    if (dataRef.current.run_next_page) {
      hasNext &&
        (await api
          .get(`/videos${dataRef.current.next_page_url}`)
          .then(response => {
            const videos = response.data.data;
            const categories = dataRef.current.categories;
            videos.forEach(video => {
              let index = getIndex(categories, video);
              if (index === -1) {
                categories.push({ category: video.category, videos: [] });
                index = getIndex(categories, video);
              }
              categories[index].videos.push(video);
            });
            setData({
              run_next_page: true,
              next_page_url: response.data.meta.next_page_url,
              videos: [...dataRef.current.videos, ...videos],
              categories: categories,
            });
          })
          .catch(error => {
            console.log(error);
          }));
    }
    setIsLoading(false);
    return hasNext;
  }, []);

  return (
    <>
      <Header
        logged={true}
        showNavbar={true}
        showSearch={true}
        showNotification={true}
      />

      <Carousel />

      <StyledContainer>
        <InfiniteScroll
          nextPage={nextPage}
          forwardLoading={isLoading}
          showLoading
        >
          <StyledDisplay display="flex" direction="column">
            {typeof dataRef.current.categories !== "undefined" &&
              0 < dataRef.current.categories.length && (
                <>
                  {dataRef.current.categories.map((item, index) => (
                    <MovieCarousel
                      key={index}
                      category={item.category}
                      videos={item.videos}
                    />
                  ))}
                </>
              )}
          </StyledDisplay>
        </InfiniteScroll>
      </StyledContainer>

      <Footer logged />
    </>
  );
};

export default ListVideo;
