
interface IAuthenticateResponseDTO {
  token: string;
  user: {
    name: string;
    email: string;
  },
}

export { IAuthenticateResponseDTO }