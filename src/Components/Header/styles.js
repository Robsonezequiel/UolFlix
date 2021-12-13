import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { black, linkGray, red, textLightGray, darkGray, white } from "../../UI/Variables";
import {
  MdSearch,
  MdClose,
  MdNotifications,
  MdMenu,
  MdFileUpload,
  MdVideoLibrary,
} from "react-icons/md";
import { Display } from "../../UI/General";
import { AiOutlineUser, AiOutlineLock, AiOutlineVideoCamera, AiOutlineVideoCameraAdd, AiOutlineLogout } from "react-icons/ai";

const StyledMenuIcons = css`
  font-size: 1.5rem;
  color: ${props => (props.color ? "red" : "white")};
  padding: ${props => (props.video ? "0 0 4px 5px" : "0 0 6px 0")};
  margin-right: 1rem;
  /* padding-bottom: 6px; */
`;
 
export const StyledUserIcon = styled(AiOutlineUser) `
   ${StyledMenuIcons};
`;
export const StyledLockIcon = styled(AiOutlineLock) `
   ${StyledMenuIcons};
`;
export const StyledVideoIcon = styled(AiOutlineVideoCamera) `
   ${StyledMenuIcons};
`;
export const StyledAddVideoIcon = styled(AiOutlineVideoCameraAdd) `
   ${StyledMenuIcons};
`;
export const StyledLogoutIcon = styled(AiOutlineLogout) `
   ${StyledMenuIcons};
`;

export const StyledHeader = styled.header`
  ${props => Display[props.display]};
  z-index: ${props => (props.logged ? "11" : "")};
  position: ${props => (props.logged ? "sticky" : "")};
  top: ${props => (props.logged ? "0" : "")};
  padding: 1rem;
  width: 100%;
  height: 75px;
  background: ${props =>
    props.logged
      ? props.sticky
        ? "rgba(0, 0, 0, 0.75)"
        : "linear-gradient(rgba(0, 0, 0, 0.75), transparent);"
      : "transparent"};
  transition: all 0.4s;

  @media (max-width: 768px) {
    background: ${props => (props.logged ? black : "")};
  }
`;

export const StyledArea = styled.div`
  ${props => Display[props.display]};
`;

export const StyledLink = styled(Link)`
  padding: 0.6rem 0.9rem; /* lembrete de conferir a margem top/bottom */
  text-decoration: none;
  text-transform: ${props => (props.uppercase ? "uppercase" : "capitalize")};
  color: ${white};
  transition: color 0.4s;

  :hover {
    color: ${props => (props.hovered_color ? linkGray : white)};
    color: ${props => (props.hovered ? red : "")};
    background-color: ${props => (props.background ? darkGray : "")};
  }

  @media (max-width: 768px) {
    position: relative;
    display: inline-block;
    color: ${white};
  }
`;

export const StyledImg = styled.img`
  width: 89px;
  height: auto;

  @media (min-width: 1450px) {
    width: ${props => (props.logged ? "100px" : "167px")};
    height: auto;
  }

  @media (max-width: 1449px) and (min-width: 950px) {
    width: ${props => (props.logged ? "100px" : "134px")};
    height: auto;
  }

  @media (max-width: 949px) and (min-width: 550px) {
    width: 108px;
    height: auto;
  }
`;

export const StyledLabel = styled.label`
  ${props => Display[props.display]};
  border: ${props => (props.is_focused ? `0.125rem solid ${white}` : "")};
  background: ${props => (props.is_focused ? "rgba(0, 0, 0, 0.75)" : "")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledIcon = css`
  font-size: 1.5rem;
  color: ${white};
`;

export const StyledUpload = styled(MdFileUpload)`
  ${StyledIcon};
`;

export const StyledEdit = styled(MdVideoLibrary)`
  ${StyledIcon};
`;

export const StyledSearch = styled(MdSearch)`
  ${StyledIcon};
  margin: 0 0.25rem 0 0.5rem;
  cursor: ${props => (props.is_focused ? "" : "pointer")};
`;

export const StyledClose = styled(MdClose)`
  ${StyledIcon};
  visibility: ${props => (props.visibility ? "visible" : "hidden")};
  margin: 0 0.5rem 0 0.25rem;
  cursor: pointer;
`;

export const StyledSideNavIcon = styled(MdMenu)`
  ${StyledIcon};
  margin: 0 1rem;
  cursor: ${props => (props.is_focused ? "" : "pointer")};

  @media (max-width: 425px) {
    margin: 0 0.5rem;
  }
`;

export const StyledInput = styled.input`
  margin: 0;
  border: none;
  outline: 0;
  padding: 0.5rem;
  background: transparent;
  color: ${white};
`;

export const StyledMobileInput = styled.input`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 178px;
    outline: 0;
    padding: 0 0.25rem;
    border: 0.1rem solid ${textLightGray};
    background: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 425px) {
    max-width: 114px;
  }
`;

export const StyledNotificationContainer = styled.div`
  position: relative;
  margin: 0 0.5rem;
  cursor: pointer;
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledNotificationImg = styled(MdNotifications)`
  font-size: 1.75rem;
  color: ${white};
`;

export const StyledNotifications = styled.div`
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 1rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    margin-top: 0.25rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.25);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.75);
  }
`;

export const StyledNotificationCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;
  margin: 0.25rem;
  margin-bottom: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.25);

  :hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const StyledNotificationCardImg = styled.img`
  width: 7.5rem;
  border-radius: 0.25rem;
  color: ${white};
`;

export const StyledNotificationCardText = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: ${white};
`;

export const StyledNotificationCardSpan = styled.span`
  font-size: 0.75rem;
  margin: 0;
  color: ${linkGray};
`;

export const StyledProfileContainer = styled.div`
  position: relative;
  margin: 0 0.5rem;
  cursor: pointer;
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledProfileImg = styled.div`
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  background-position: center;
  display: inline-block;
  max-width: 40px;
  width: 40px;
  max-height: 40px;
  height: 40px;
  border-radius: 0.5rem;
`;

export const StyledDropdown = styled.div`
  ${props => Display[props.display]};
  position: absolute;
  top: calc(100% + 1.25rem);
  right: -0.5rem;
  width: ${props => (props.width ? props.width : "10rem")};
  max-height: 20rem;
  padding: 0;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.9);

  &::before {
    content: "";
    position: absolute;
    top: -0.75rem;
    right: 0.5rem;
    width: 0.75rem;
    height: 0.5rem;
    border-bottom: 0.75rem solid rgba(0, 0, 0, 0.9);
    border-right: 0.75rem solid transparent;
    border-left: 0.75rem solid transparent;
  }
`;

export const StyledNavLink = styled(StyledLink)`
  display: inline-block;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledSideNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const StyledSideNavContainer = styled.div`
  ${props => Display[props.display]};
  position: fixed;
  left: 0;
  top: 75px;
  width: 250px;
  height: 100%;
  background: ${black};
`;

export const StyledSideNavTopArea = styled.div`
  ${props => Display[props.display]};
`;

export const StyledSideNavProfileArea = styled.div`
  ${props => Display[props.display]};
  margin-bottom: 0.5rem;
  padding: 0.25rem 1.5rem;
`;

export const StyledAvatarName = styled.div`
  ${props => Display[props.display]};
  margin-top: 0.5rem;
  padding: 0.25rem 1rem;
`;

export const StyledSideNavTextUsername = styled.p`
  margin: 0 0 0 0.5rem;
  color: ${white};
`;

export const StyledSideNavLink = styled(StyledLink)`
  position: relative;
  margin: 0;
  padding: ${props => (props.no_padding ? "0.25rem 0" : "0.6rem 1.5rem")};
  padding: ${props => (props.less_padding ? "0.15rem 1.5rem" : "")};
  border-left: ${props =>
    props.active ? `0.3rem solid ${red}` : "0.3rem solid transparent"};
`;

export const StyledSideNavShadow = styled.div`
  position: absolute;
  left: 250px;
  width: calc(100vw - 250px);
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0.25)
  );
`;

export const StyledLine = styled.hr`
  margin: 0.25rem;
  color: ${white};
`;
