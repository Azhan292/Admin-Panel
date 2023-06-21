import { gql } from "@apollo/client";


const Customer = gql`
query Customer($id: ID!) {
  customer(ID: $id) {
    email
    password
  }
}
`;