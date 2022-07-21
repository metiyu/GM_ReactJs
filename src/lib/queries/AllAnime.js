import { gql } from "@apollo/client";

export const ALL_ANIME = gql`
query AllAnime($page: Int, $perPage: Int){
	Page(page: $page, perPage: $perPage){
    media(type: ANIME, sort: TRENDING_DESC){
        id
        seasonYear
        genres
        duration
        averageScore
        episodes
        title{
            romaji
        }
        coverImage{
            large
        }
    }
    }
}
`