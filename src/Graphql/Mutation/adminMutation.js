import { gql } from "@apollo/client";


const ADMIN_CREATE = gql`
mutation Mutation($registerAdminInput: RegisterAdminInput) {
    createAdmin(registerAdminInput: $registerAdminInput) {
      code
      data {
        email
        id
        token
        userName
        url
      }
      message
    }
  }
`
const ADMIN_LOGIN = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginAdmin(loginInput: $loginInput) {
      code
      message
      data {
        email
        id
        password
        token
        userName
      }
    }
  }
`;
const ADMIN_DELETE = gql`
mutation DeleteAdmin($id: ID!) {
    deleteAdmin(ID: $id) {
      code
      message
      data {
        email
      }
    }
  }

`
export { 
    ADMIN_LOGIN,
    ADMIN_CREATE,
    ADMIN_DELETE
};
