import { gql } from "@apollo/client";

export const GET_ANIME = gql`
query GetAnime($id: Int){
    Media(type: ANIME, sort: TRENDING_DESC, id: $id){
        id
        seasonYear
        averageScore
        trending
        rankings {
            rank
            allTime
        }
        description
        episodes
        studios {
            edges {
            node {
                name
            }
            }
        }
        duration
        source
        genres
        characters {
            edges {
            node {
                name {
                    userPreferred
                }
                image {
                large
                }
            }
            role
            voiceActors {
                name{
                last
                first
                middle
                userPreferred
                }
                image{
                large
                }
            }
            }
        }
        title{
            romaji
            native
        }
        coverImage{
            large
        }
        }
    }
`