import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Form from "./Form";
import Videos from "./Videos";
import ConfirmDialog from "./ConfirmDialog";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import {
  StyledBody,
  StyledContainer,
  StyledContent,
  StyledTitleArea,
  StyledText,
  StyledNoVideo,
  StyledLink,
  StyledVideoIcon,
} from "./styles";
import { StyledTitle } from "../../UI/FormStyle";
import api from "../../Services/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const EditVideo = () => {
  let query = useQuery();
  const [data, _setData] = useState({
    run_next_page: false,
    offset: 0,
    limit: 20,
    videos: [],
    displayedVideos: [],
  });
  const [videoToEdit, setVideoToEdit] = useState({});
  const dataRef = useRef(data);

  const setData = data => {
    dataRef.current = data;
    _setData(data);
  };

  useEffect(() => {
    if (query.get("fromInsertVideo") === "successfully") {
      toast.success("Vídeo incluido com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (query.get("fromPasswordUpdate") === "successfully") {
      toast.success("Senha atualizada com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    api
      .get("/users/info")
      .then(response => {
        const videos = response.data.videos;
        localStorage.setItem("@uolflix:loginVideos", JSON.stringify(videos));
        const offset = dataRef.current.offset;
        const limit = dataRef.current.limit;
        setData({
          run_next_page: true,
          offset: offset + limit,
          limit,
          videos,
          displayedVideos: [
            ...dataRef.current.videos,
            ...videos.slice(offset, offset + limit),
          ],
        });
      })
      .catch(error => {
        console.log(error);
      });
    // const videos = JSON.parse(localStorage.getItem("@uolflix:loginVideos"));
    // const offset = dataRef.current.offset;
    // const limit = dataRef.current.limit;
    // setData({
    //   run_next_page: true,
    //   offset: offset + limit,
    //   limit,
    //   videos: [
    //     ...dataRef.current.videos,
    //     ...videos.slice(offset, offset + limit),
    //   ],
    //   displayedVideos: [
    //     ...dataRef.current.videos,
    //     ...videos.slice(offset, offset + limit),
    //   ],
    // });
    // nextPage();
  }, []);

  const nextPage = useCallback(async () => {
    // await api
    //   .get("/users/info")
    //   .then(response => {
    //     const videos = response.data.videos;
    //     const offset = dataRef.current.offset;
    //     const hasNext = offset < videos.length;
    //     if (dataRef.current.run_next_page) {
    //       if (hasNext) {
    //         console.log(dataRef.current);
    //         const limit =
    //           offset + dataRef.current.limit < videos.length
    //             ? dataRef.current.limit
    //             : videos.length - offset;
    //         setData({
    //           run_next_page: true,
    //           offset: offset + limit,
    //           limit: dataRef.current.limit,
    //           videos,
    //           displayedVideos: [
    //             ...dataRef.current.videos,
    //             ...videos.slice(offset, offset + limit),
    //           ],
    //         });
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    const videos = JSON.parse(localStorage.getItem("@uolflix:loginVideos"));
    const offset = dataRef.current.offset;
    const hasNext = offset < videos.length;
    if (dataRef.current.run_next_page) {
      if (hasNext) {
        console.log(dataRef.current);
        const limit =
          offset + dataRef.current.limit < videos.length
            ? dataRef.current.limit
            : videos.length - offset;
        setData({
          run_next_page: true,
          offset: offset + limit,
          limit: dataRef.current.limit,
          videos: [
            ...dataRef.current.videos,
            ...videos.slice(offset, offset + limit),
          ],
        });
      }
    }
    return hasNext;
  }, []);

  const handleEdit = useCallback(video => {
    setVideoToEdit(video);
  }, []);

  const handleDelete = useCallback(video => {
    const deleteVideo = () => {
      api
        .delete(`/videos/${video.id}`)
        .then(response => {
          const index = dataRef.current.videos.findIndex(
            finding => finding.id === video.id,
          );
          let newVideos = dataRef.current.videos;
          let displayedVideos = dataRef.current.displayedVideos;
          newVideos.splice(index, 1);
          displayedVideos.splice(index, 1);
          setData({
            run_next_page: dataRef.current.run_next_page,
            offset: dataRef.current.offset,
            limit: dataRef.current.limit,
            videos: newVideos,
            displayedVideos: displayedVideos,
          });
          console.log(response);
          toast.success("Vídeo excluído com sucesso!", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(error => {
          console.log(error);
          toast.error("Não foi possível excluir o vídeo!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
      setVideoToEdit({});
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDialog
            video={video}
            onClose={onClose}
            onConfirm={() => {
              deleteVideo();
              onClose();
            }}
          />
        );
      },
    });
  }, []);

  const handleBack = useCallback(video => {
    if (typeof video !== "undefined") {
      const index = dataRef.current.videos.findIndex(
        finding => finding.id === video.id,
      );
      let newVideos = dataRef.current.videos;
      let displayedVideos = dataRef.current.displayedVideos;
      newVideos[index] = video;
      displayedVideos[index] = video;
      setData({
        run_next_page: dataRef.current.run_next_page,
        offset: dataRef.current.offset,
        limit: dataRef.current.limit,
        videos: newVideos,
        displayedVideos: displayedVideos,
      });
    }

    setVideoToEdit({});
  }, []);

  return (
    <StyledBody
      display="flex"
      direction="column"
      justify="space-between"
      grow="1"
    >
      <Header logged={true} showAddVideo={true} />
      <ToastContainer />
      <StyledContainer display="flex" direction="column" align="center">
        <StyledContent formPadding>
          <StyledTitle marginFormTitle>Meus vídeos</StyledTitle>
          {typeof dataRef.current.displayedVideos !== "undefined" &&
            0 < dataRef.current.displayedVideos.length && (
              <>
                {0 < Object.keys(videoToEdit).length ? (
                  <Form video={videoToEdit} handleBack={handleBack} />
                ) : (
                  <>
                    <InfiniteScroll nextPage={nextPage} showLoading showHasNext>
                      <Videos
                        videos={dataRef.current.displayedVideos}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    </InfiniteScroll>
                  </>
                )}
              </>
            )}
          {typeof dataRef.current.displayedVideos !== "undefined" &&
            dataRef.current.displayedVideos.length === 0 && (
              <StyledNoVideo
                display="flex"
                direction="column"
                justify="center"
                align="center"
              >
                <StyledVideoIcon />
                <StyledText>
                  Parece que você não adicionou nenhum vídeo ainda.
                </StyledText>
                <StyledLink to="/InsertVideo">
                  Deseja adicionar algum?
                </StyledLink>
              </StyledNoVideo>
            )}
        </StyledContent>
      </StyledContainer>
      <Footer logged />
    </StyledBody>
  );
};

export default EditVideo;
