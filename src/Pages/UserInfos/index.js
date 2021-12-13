import React, { useRef, useState, useEffect, useCallback } from "react";
import * as yup from "yup";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import Input from "../../Components/Form/Input";
import { isValidBirth, isValidUsername } from "../../Utils/validateFunctions";
import { StyledTitle, StyledGroup } from "../../UI/FormStyle";
import { ToastContainer, toast } from "react-toastify";
import avatarPadrao from "../../Assets/Imagens/avatarPadrao.png";
import {
  FlexDiv,
  FlexDivResponsive,
  AvatarDiv,
} from "../../UI/FormLoggedStyle";
import { StyledEditIcon } from "../EditVideo/Videos/styles.js";
import { StyledEditAvatar } from "./styles";
import api from "../../Services/api";
import {
  StyledBody,
  StyledContainer,
  StyledContent,
} from "../EditVideo/styles";
import { StyledButtonArea, StyledForm } from "../EditVideo/Form/styles";
import DateTime from "../../Components/Form/Datetime";
import "react-toastify/dist/ReactToastify.css";

const UserInfos = () => {
  const formRef = useRef(null);
  const hiddenFileInput = useRef(null);
  const cepRef = useRef(null);
  const avatarFile = useRef("");
  const [cpfMask, setCPFmask] = useState("");
  const [cepMask, setCEPmask] = useState("");
  const [phoneMask, setPhoneMask] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [infoUser, setInfoUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [birthDate, setBirthDate] = useState(null);

  const handleSuccessToast = () => {
    toast.success("Usuário atualizado com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleFailToast = () => {
    toast.error("Oops... Parece que algo deu errado!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    api
      .get("/users/info")
      .then(resp => {
        if (resp.data.avatar === "") {
          setAvatar(avatarPadrao);
        } else {
          api
            .get(`/files/${resp.data.avatar}`, { responseType: "arraybuffer" })
            .then(res => {
              avatarFile.current = resp.data.avatar;
              setAvatar(getImage(res.data));
            })
            .catch(userError => {
              setAvatar(avatarPadrao);
            });
        }
        setInfoUser(resp.data);
        resp.data.cep !== null && setCEPmask(maskCEP(resp.data.cep));
        resp.data.cpf !== null && setCPFmask(cpfMask => maskCPF(resp.data.cpf));
        resp.data.phone !== null && setPhoneMask(maskPhone(resp.data.phone));
        if (resp.data.birth_date !== null) {
          const splitDate = resp.data.birth_date.split("-");
          setBirthDate(
            new Date(
              toInt(splitDate[0]),
              toInt(splitDate[1]) - 1,
              toInt(splitDate[2]),
            ),
          );
        }
      })
      .catch(userError => {});
  }, []);

  const getImage = useCallback(blob => {
    const base64 = btoa(
      new Uint8Array(blob).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );
    return `data:;base64,${base64}`;
  }, []);

  const getDate = date => {
    const split = date.split("/");
    return `${split[2]}-${split[1]}-${split[0]}`;
  };

  const maskCEP = value => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
  };

  const maskCPF = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const maskPhone = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };

  const removeMask = value => {
    return value.replace(/([^\d])+/g, "");
  };

  const toInt = value => {
    return value === "" ? null : parseInt(value);
  };

  const isValidCep = () => {
    return yup
      .string()
      .matches(/(?:[\d]{5}-[\d]{3})|(^$)/g, "Informe um CEP válido");
  };

  const validateCep = async data => {
    let passed = false;
    const validationErrors = {};
    if (data.cep.length == 0) {
      passed = true;
    } else {
      try {
        const yupSchema = yup.object().shape({
          cep: isValidCep(),
        });
        await yupSchema.validate(data, {
          abortEarly: false,
        });
        await axios
          .get(`https://viacep.com.br/ws/${data.cep}/json`)
          .then(function (response) {
            if (response.data.erro) {
              validationErrors["cep"] = "O CEP não foi encontrado";
            } else {
              passed = true;
              document.getElementById("street").value =
                response.data?.logradouro;
              document.getElementById("district").value = response.data?.bairro;
              document.getElementById("city").value = response.data?.localidade;
              document.getElementById("state").value = response.data?.uf;
            }
          });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
        }
      }
    }
    return { passed, validationErrors };
  };

  const validateUserInfos = useCallback(async data => {
    let { passed, validationErrors } = await validateCep({ cep: data.cep });

    if (selectedFile !== null) {
      setAvatar(selectedFile);
    }

    const schema = {
      username: data.username,
      cpf: removeMask(data.cpf),
      birthDate: data.birthDate === "" ? null : getDate(data.birthDate),
      phone: toInt(removeMask(data.phone)),
      cep: toInt(removeMask(data.cep)),
      city: data.city,
      state: data.state,
      district: data.district,
      street: data.street,
      number: toInt(data.number),
      complement: data.complement,
    };

    try {
      const shape = {
        username: isValidUsername(),
      };
      if (0 < schema.birthDate?.length) {
        shape["birthDate"] = isValidBirth();
      }
      const yupSchema = yup.object().shape(shape);
      await yupSchema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      passed = false;
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
      }
    }

    return { passed, schema, validationErrors };
  }, []);

  const handleSubmit = async data => {
    const { passed, schema, validationErrors } = await validateUserInfos(data);
    formRef.current.setErrors(validationErrors);

    if (passed) {
      if (selectedFile !== null) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        await api.post("/files", formData).then(response => {
          avatarFile.current = response.data.file;
        });
        api
          .get(`/files/${avatarFile.current}`, { responseType: "arraybuffer" })
          .then(res => {
            setAvatar(getImage(res.data));
          })
          .catch(userError => setAvatar(avatarPadrao));
        setSelectedFile(null);
      }
      api
        .patch("/users/update", { ...schema, avatar: avatarFile.current })
        .then(response => {
          console.log(response);
          if (response.status) {
            handleSuccessToast();
            localStorage.setItem("@uolflix:loginUsername", schema.username);
          }
        })
        .catch(error => {
          console.log(error.response);
          handleFailToast();
        });
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    if (event.target.files.length !== 0) {
      setSelectedFile(event.target.files[0]);
      setAvatar(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleBlur = async () => {
    const cep = { cep: cepRef.current.value };
    const { validationErrors } = await validateCep(cep);
    formRef.current.setErrors(validationErrors);
  };

  return (
    <StyledBody
      display="flex"
      direction="column"
      justify="space-between"
      grow="1"
    >
      <Header forwardAvatar={avatar} logged={true} />
      <ToastContainer />
      <StyledContainer display="flex" direction="column" align="center">
        <StyledContent formPadding>
          <StyledTitle marginFormTitle>Perfil do Usuário</StyledTitle>
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <FlexDivResponsive
              display="grid"
              columns="142px 1fr"
              column_gap="1rem"
            >
              <StyledGroup margin="0 0 2rem">
                <AvatarDiv type="file" src={avatar}>
                  <StyledEditAvatar type="button" onClick={handleClick}>
                    <input
                      accept="image/*"
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <StyledEditIcon />
                  </StyledEditAvatar>
                </AvatarDiv>
              </StyledGroup>
              <FlexDiv display="grid" rows="1fr 1fr">
                <StyledGroup margin="0 0 2rem">
                  <Input
                    name="email"
                    placeholder="E-mail (inalterável)"
                    style={{ color: "#737373" }}
                    defaultValue={localStorage.getItem("@uolflix:loginEmail")}
                    disabled="disabled"
                  />
                </StyledGroup>
                <StyledGroup margin="0 0 2rem">
                  <Input
                    name="username"
                    defaultValue={infoUser.username}
                    placeholder="Nome"
                  />
                </StyledGroup>
              </FlexDiv>
            </FlexDivResponsive>
            <FlexDiv display="grid" columns="1fr 1fr" column_gap="1rem">
              <StyledGroup margin="0 0 2rem">
                <Input
                  name="cpf"
                  type="text"
                  placeholder="CPF"
                  maxLength="14"
                  value={cpfMask}
                  onChange={e => setCPFmask(maskCPF(e.target.value))}
                />
              </StyledGroup>
              <StyledGroup margin="0 0 2rem">
                <DateTime
                  name="birthDate"
                  timeFormat={false}
                  dateFormat="DD/MM/YYYY"
                  placeholder="Data de nascimento"
                  autoComplete="off"
                  value={birthDate === null ? undefined : birthDate}
                  onChange={setBirthDate}
                />
              </StyledGroup>
            </FlexDiv>
            <FlexDiv display="grid" columns="1fr 1fr" column_gap="1rem">
              <StyledGroup margin="0 0 2rem">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Telefone"
                  maxLength="15"
                  value={phoneMask}
                  onChange={e => setPhoneMask(maskPhone(e.target.value))}
                />
              </StyledGroup>
              <StyledGroup margin="0 0 2rem">
                <Input
                  forwardedRef={cepRef}
                  name="cep"
                  type="text"
                  placeholder="CEP"
                  maxLength="8"
                  value={cepMask}
                  onChange={e => setCEPmask(maskCEP(e.target.value))}
                  onBlur={handleBlur}
                />
              </StyledGroup>
            </FlexDiv>
            <StyledGroup margin="0 0 2rem">
              <Input
                id="street"
                name="street"
                defaultValue={infoUser.street}
                placeholder="Endereço"
                type="text"
              />
            </StyledGroup>
            <FlexDiv display="grid" columns="1fr 1fr" column_gap="1rem">
              <StyledGroup margin="0 0 2rem">
                <Input
                  name="number"
                  type="text"
                  defaultValue={infoUser.number}
                  placeholder="Número"
                />
              </StyledGroup>
              <StyledGroup margin="0 0 2rem">
                <Input
                  name="complement"
                  type="text"
                  defaultValue={infoUser.complement}
                  placeholder="Complemento"
                />
              </StyledGroup>
            </FlexDiv>
            <StyledGroup margin="0 0 2rem">
              <Input
                id="district"
                name="district"
                defaultValue={infoUser.district}
                placeholder="Bairro"
                type="text"
              />
            </StyledGroup>
            <FlexDiv display="grid" columns="1fr 1fr" column_gap="1rem">
              <StyledGroup margin="0 0 2rem">
                <Input
                  id="city"
                  name="city"
                  defaultValue={infoUser.city}
                  placeholder="Cidade"
                  type="text"
                />
              </StyledGroup>
              <StyledGroup margin="0 0 2rem">
                <Input
                  id="state"
                  name="state"
                  defaultValue={infoUser.state}
                  placeholder="Estado"
                  type="text"
                  maxLength="2"
                />
              </StyledGroup>
            </FlexDiv>
            <StyledButtonArea display="flex" justify="flex-end" blockOnMobile>
              <StyledGroup margin="0 0 2rem">
                <Button width="initial" dataStyleType="Steps">
                  Salvar
                </Button>
              </StyledGroup>
            </StyledButtonArea>
          </StyledForm>
        </StyledContent>
      </StyledContainer>
      <Footer logged />
    </StyledBody>
  );
};

export default UserInfos;
