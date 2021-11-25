// Appolo
import { gql } from "@apollo/client";

export const GET_ALL_MASTER_CATEGORIES = gql`
query getAllMasterCategories {
    master_categories(order_by: {order: asc}) {
      name
      image
      id
    }
  }`

export const GET_ALL_CATEGORIES = gql`
query getAllCategories {
  categories {
    id
    name
  }
}`

export const GET_CATEGORIES_BY_MASTER_CATEGORY_ID = gql`
  query getCategoriesByMasterCategoryId($master_category_id: uuid) {
    categories(where: {master_category_id: {_eq: $master_category_id}}) {
      id
      name
    }
}`

export const GET_SERVICES_BY_CATEGORY_ID = gql`
  query getServicesByCategoryId($category_id: uuid) {
    categories(where: {id: {_eq: $category_id}}) {
      services {
        id
        in_clinic
        name
        price
        rating
        duration
      }
    }
}`

export const GET_SERVICES = gql`
  query getServicesByCategoryId($category_id: uuid) {
      services(where: {category_id: {_eq: $category_id}}){
        category_id
        id
        in_clinic
        name
        price
        rating
        duration
      }
    }
`

export const CREATE_NEW_SERVICE = gql`
  mutation CreateNewService($category_id: uuid!, $name: String!, $in_clinic: Boolean, $price: float8, $rating: Int, $duration: Int) {
  insert_services_one(object: {category_id: $category_id, name: $name, in_clinic: $in_clinic, price: $price, rating: $rating, duration: $duration}) {
    category_id
    duration
    in_clinic
    name
    rating
    price
  }
}
`