import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../Assets/Imagens/logo.png";
import defaultPP from "../../Assets/Imagens/default-pp.jpg";
import preview1 from "../../Assets/Imagens/preview1.jpg";
import preview2 from "../../Assets/Imagens/preview2.png";
import notificationData from "./notificationData";
import avatarPadrao from "../../Assets/Imagens/avatarPadrao.png";
import Button from "../Button/index";
import {
  StyledHeader,
  StyledArea,
  StyledLink,
  StyledImg,
  StyledLabel,
  StyledSearch,
  StyledInput,
  StyledClose,
  StyledMobileInput,
  StyledNotificationContainer,
  StyledNotificationImg,
  StyledNotifications,
  StyledNotificationCard,
  StyledNotificationCardImg,
  StyledNotificationCardText,
  StyledNotificationCardSpan,
  StyledProfileContainer,
  StyledProfileImg,
  StyledDropdown,
  StyledNavLink,
  StyledSideNav,
  StyledSideNavIcon,
  StyledSideNavContainer,
  StyledSideNavTopArea,
  StyledSideNavProfileArea,
  StyledSideNavLink,
  StyledSideNavTextUsername,
  StyledSideNavShadow,
  StyledUpload,
  StyledEdit,
  StyledLine,
  StyledUserIcon,
  StyledLockIcon,
  StyledVideoIcon,
  StyledAddVideoIcon,
  StyledLogoutIcon,
  StyledAvatarName,
} from "./styles";
import api from "../../Services/api";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { BiVideo, BiVideoPlus } from "react-icons/bi";

const Header = ({
  forwardAvatar,
  logged,
  showNavbar,
  showSearch,
  showNotification,
  showButton,
  showAddVideo,
  showEditVideo,
}) => {
  let history = useHistory();
  const [stickyHeader, setStickyHeader] = useState(false);
  const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false);
  const [toggleNotificationDropdown, setToggleNotificationDropdown] =
    useState(false);
  const [toggleSideNavOpened, setToggleSideNavOpened] = useState(false);
  const [toggleSearchBarOpened, setToggleSearchBarOpened] = useState(false);
  const [toggleInputedSearch, setToggleInputedSearch] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const sideNavRef = useRef(null);
  const searchRef = useRef(null);
  const inputSearchRef = useRef(null);
  const username = localStorage.getItem("@uolflix:loginUsername");
  const url = useLocation().pathname;

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    if (localStorage.getItem("@uolflix:loginToken") !== null) {
      api
        .get("/users/info")
        .then(resp => {
          if (resp.data.avatar === "") {
            setAvatar(avatarPadrao);
          } else {
            api
              .get(`/files/${resp.data.avatar}`, {
                responseType: "arraybuffer",
              })
              .then(res => {
                setAvatar(getImage(res.data));
              })
              .catch(userError => setAvatar(avatarPadrao));
          }
        })
        .catch(userError => {
          if (logged) {
            localStorage.removeItem("@uolflix:loginToken");
            localStorage.removeItem("@uolflix:loginEmail");
            localStorage.removeItem("@uolflix:loginUsername");
            history.push("/");
          }
        });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [forwardAvatar]);

  const getImage = useCallback(blob => {
    const base64 = btoa(
      new Uint8Array(blob).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );
    return `data:;base64,${base64}`;
  }, []);

  const handleClickOutside = useCallback(e => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setToggleProfileDropdown(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setToggleNotificationDropdown(false);
    }

    if (sideNavRef.current && !sideNavRef.current.contains(e.target)) {
      setToggleSideNavOpened(false);
    }
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setToggleSearchBarOpened(false);
    }
  });

  const handleScroll = useCallback(() => {
    if (20 < window.pageYOffset) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  });

  const handleLogout = useCallback(async () => {
    api
      .delete("/sessions/logout")
      .then(response => {
        if (response.status) {
          localStorage.removeItem("@uolflix:loginToken");
          localStorage.removeItem("@uolflix:loginEmail");
          localStorage.removeItem("@uolflix:loginUsername");
          localStorage.removeItem("@uolflix:loginId");
          localStorage.removeItem("@uolflix:loginVideos");
          history.push("/");
        }
      })
      .catch(error => {});
  }, []);

  const handleSearchInputChange = useCallback(e => {
    if (e.target.value === "") {
      setToggleInputedSearch(false);
    } else if (!toggleInputedSearch) {
      setToggleInputedSearch(true);
    }
  }, []);

  const handleCloseIconClicked = useCallback(() => {
    inputSearchRef.current.value = "";
  }, []);

  const handleToggle = useCallback(func => {
    func(value => !value);
  }, []);

  return (
    <StyledHeader
      display="flex"
      justify="space-between"
      logged={logged ? 1 : 0}
      sticky={stickyHeader ? 1 : 0}
    >
      <StyledArea display="flex" align="center">
        {logged && (
          <>
            {toggleSideNavOpened && (
              <StyledSideNavContainer display="flex" direction="column">
                <StyledSideNavShadow />
              </StyledSideNavContainer>
            )}
            <StyledSideNav ref={sideNavRef}>
              <StyledSideNavIcon
                onClick={() => {
                  handleToggle(setToggleSideNavOpened);
                }}
              />
              {toggleSideNavOpened && (
                <StyledSideNavContainer display="flex" direction="column">
                  <StyledSideNavTopArea display="flex" direction="column">
                    <StyledSideNavProfileArea display="flex" align="center">
                      <StyledProfileImg src={avatar} />
                      <StyledSideNavTextUsername>
                        <StyledLink to="/UserInfos">{username}</StyledLink>
                      </StyledSideNavTextUsername>
                    </StyledSideNavProfileArea>
                    <StyledSideNavLink
                      to="/UserInfos"
                      active={url === "/UserInfos" ? 1 : 0}
                    >
                      Editar perfil
                    </StyledSideNavLink>
                    <StyledSideNavLink
                      to="/PasswordUpdate"
                      active={url === "/PasswordUpdate" ? 1 : 0}
                    >
                      Editar senha
                    </StyledSideNavLink>
                    <StyledSideNavLink
                      to="/EditVideo"
                      active={url === "/EditVideo" ? 1 : 0}
                    >
                      Meus vídeos
                    </StyledSideNavLink>
                    <StyledSideNavLink
                      to="/InsertVideo"
                      active={url === "/InsertVideo" ? 1 : 0}
                    >
                      Adicionar vídeo
                    </StyledSideNavLink>
                    <StyledSideNavLink
                      to="#!"
                      onClick={handleLogout}
                      style={{ color: "red" }}
                    >
                      Sair da UolFlix
                    </StyledSideNavLink>
                  </StyledSideNavTopArea>
                  <hr />
                  <StyledSideNavLink
                    to="/"
                    active={url === "/ListVideo" ? 1 : 0}
                    less_padding={1}
                  >
                    Início
                  </StyledSideNavLink>
                  <StyledSideNavLink less_padding={1} to="#!">
                    Séries
                  </StyledSideNavLink>
                  <StyledSideNavLink less_padding={1} to="#!">
                    Filmes
                  </StyledSideNavLink>
                  <StyledSideNavLink less_padding={1} to="#!">
                    Bombando
                  </StyledSideNavLink>
                  <StyledSideNavLink less_padding={1} to="#!">
                    Minha lista
                  </StyledSideNavLink>
                </StyledSideNavContainer>
              )}
            </StyledSideNav>
          </>
        )}
        <StyledLink to="/">
          <StyledImg src={logo} alt="Logotipo da UolFlix" logged={1} />
        </StyledLink>
        {logged && showNavbar && (
          <nav>
            <StyledNavLink to="#!" hovered_color={1}>
              Início
            </StyledNavLink>
            <StyledNavLink to="#!" hovered_color={1}>
              Séries
            </StyledNavLink>
            <StyledNavLink to="#!" hovered_color={1}>
              Filmes
            </StyledNavLink>
            <StyledNavLink to="#!" hovered_color={1}>
              Bombando
            </StyledNavLink>
            <StyledNavLink to="#!" hovered_color={1}>
              Minha lista
            </StyledNavLink>
          </nav>
        )}
      </StyledArea>
      {logged && (
        <StyledArea display="flex" align="center">
          {/* {showSearch && (
            <>
              <StyledLabel
                display="flex"
                align="center"
                is_focused={toggleSearchBarOpened ? 1 : 0}
                ref={searchRef}
              >
                <StyledSearch
                  onClick={() => {
                    handleToggle(setToggleSearchBarOpened);
                  }}
                />
                {toggleSearchBarOpened && (
                  <>
                    <StyledInput
                      ref={inputSearchRef}
                      placeholder="Títulos, gente e gêneros"
                      onChange={handleSearchInputChange}
                    />
                    <StyledClose
                      visibility={toggleInputedSearch ? 1 : 0}
                      onClick={handleCloseIconClicked}
                    />
                  </>
                )}
              </StyledLabel>
              <StyledMobileInput placeholder="Buscar" />
            </>
          )} */}
          {showAddVideo && (
            <StyledNavLink to="/InsertVideo" uppercase={1}>
              <StyledUpload /> Adicionar vídeo
            </StyledNavLink>
          )}
          {showEditVideo && (
            <StyledNavLink to="/EditVideo" uppercase={1}>
              <StyledEdit /> Meus vídeos
            </StyledNavLink>
          )}
          {showNotification && (
            <>
              <StyledNavLink to="#!" uppercase={1}>
                Infantil
              </StyledNavLink>
              <StyledNotificationContainer ref={notificationRef}>
                <StyledNotificationImg
                  onClick={() => {
                    handleToggle(setToggleNotificationDropdown);
                  }}
                />
                {toggleNotificationDropdown && (
                  <StyledDropdown
                    display="flex"
                    direction="column"
                    width="25rem"
                  >
                    <StyledNotifications>
                      {notificationData.map(notification => (
                        <StyledNotificationCard key={notification.id}>
                          <StyledNotificationCardImg
                            src={notification.id % 2 == 0 ? preview1 : preview2}
                            alt={notification.previewAlt}
                          />
                          <div>
                            <StyledNotificationCardText>
                              {notification.title}
                            </StyledNotificationCardText>
                            <StyledNotificationCardText>
                              {notification.info}
                            </StyledNotificationCardText>
                            <StyledNotificationCardSpan>
                              {notification.when}
                            </StyledNotificationCardSpan>
                          </div>
                        </StyledNotificationCard>
                      ))}
                    </StyledNotifications>
                  </StyledDropdown>
                )}
              </StyledNotificationContainer>
            </>
          )}
          <StyledProfileContainer ref={profileRef}>
            <StyledProfileImg
              src={avatar}
              onClick={() => {
                handleToggle(setToggleProfileDropdown);
              }}
            />
            {toggleProfileDropdown && (
              <StyledDropdown width="14rem" display="flex" direction="column">
                <StyledAvatarName display="flex" align="center">
                  <StyledProfileImg src={avatar} />
                  <StyledLink to="/UserInfos" no_padding={1}>
                    {username}
                  </StyledLink>
                </StyledAvatarName>
                <StyledLine />

                <StyledLink align-items="center" to="/UserInfos" background={1}>
                  <StyledUserIcon /> Editar perfil{" "}
                </StyledLink>
                <StyledLink to="/PasswordUpdate" background={1}>
                  <StyledLockIcon /> Editar senha{" "}
                </StyledLink>
                <StyledLink to="/EditVideo" background={1}>
                  <StyledVideoIcon video /> Meus vídeos{" "}
                </StyledLink>
                <StyledLink to="/InsertVideo" background={1}>
                  <StyledAddVideoIcon video /> Adicionar vídeo{" "}
                </StyledLink>
                <StyledLine />
                <StyledLink to="#!" onClick={handleLogout} hovered={1}>
                  <StyledLogoutIcon color />
                  Sair da UolFlix
                </StyledLink>
              </StyledDropdown>
            )}
          </StyledProfileContainer>
        </StyledArea>
      )}
      {!logged && showButton && (
        <StyledLink to="/Login">
          <Button dataStyleType="Home">Entrar</Button>
        </StyledLink>
      )}
    </StyledHeader>
  );
};

export default Header;
