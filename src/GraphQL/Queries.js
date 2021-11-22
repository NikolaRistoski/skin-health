// Appolo
import { gql } from "@apollo/client";

export const GET_ALL_MASTER_CATEGORIES = gql`
query getAllCategories {
    master_categories {
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