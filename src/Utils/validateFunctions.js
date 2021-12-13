import * as yup from "yup";

export const isValidUsername = () => {
  return yup
    .string()
    .matches(
      /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ()]+(\s+[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ()]+)*$/g,
      "Informe um nome válido",
    )
    .required("O nome não pode estar em branco");
};

export const isValidBirth = () => {
  return yup
    .date()
    .max(
      new Date(Date.now() - 567648000000),
      "Você deve ter pelo menos 18 anos",
    );
};

export const isValidEmail = () => {
  return yup
    .string()
    .email("Informe um e-mail válido")
    .required("O e-mail não pode estar em branco");
};

export const isValidPassword = isRegistration => {
  return isRegistration
    ? yup
        .string()
        .min(6, "A senha deve ter entre 6 e 60 caracteres")
        .max(60, "A senha deve ter entre 6 e 60 caracteres")
        .matches(
          /(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\.]).*/g,
          "A senha deve conter pelo menos: • Uma letra maiúscula; • Um número; • Um caractere especial",
        )
        .required("A senha não pode estar em branco")
    : yup
        .string()
        .min(6, "A senha deve ter entre 6 e 60 caracteres")
        .max(60, "A senha deve ter entre 6 e 60 caracteres")
        .required("A senha não pode estar em branco");
};

export const isValidYoutubeURL = () => {
  return yup
    .string()
    .matches(
      /(https:\/\/)?(www\.)?((youtube\.com\/((watch\?((?:(&?v=[a-zA-Z0-9\-]+)|(&?index=[0-9]+)|(&?ab_channel=[a-zA-Z0-9\-_]+)|(&?t=([0-9]+h)?([0-9]+m)?([0-9]+s)?)|(&?list=[a-zA-Z0-9_]+)|(&?start_radio=[0-9]+)|(&?rv=[a-zA-Z0-9]+))+))|(embed\/[a-zA-Z0-9]+)))|(youtu.be\/[a-zA-Z0-9]+)|(youtube-nocookie.com\/embed\/[a-zA-Z0-9]+(\?start=[0-9]+)))/g,
      "Informe uma URL válida!",
    )
    .required("A URL não pode estar em branco");
};

export const isValidURL = () => {
  return yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]{2,})+\/(?:[a-zA-Z0-9\-\/]+)(\.[a-zA-Z0-9\-]+)?$/g,
      "Informe uma URL válida!",
    )
    .required("A URL não pode estar em branco");
};

export const validateToken = async data => {
  const isValid = () => {
    return yup
      .string()
      .matches(
        /(?=.*[\w])(?!.*[#?!@$%^&*-\.]).*/g,
        "O token deve conter 6 digitos alfanuméricos",
      )
      .required("O token deve conter 6 digitos alfanuméricos");
  };

  let passed = false;
  const validationErrors = {};
  const schema = {
    token: `${data.token0}${data.token1}${data.token2}${data.token3}${data.token4}${data.token5}`,
  };
  const shape = {};
  for (const key in data) {
    shape[key] = isValid();
  }

  try {
    const yupSchema = yup.object().shape(shape);
    await yupSchema.validate(data, {
      abortEarly: false,
    });
    passed = true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
    }
  }
  return { passed, schema, validationErrors };
};
