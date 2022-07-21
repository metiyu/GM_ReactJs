import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import DetailPage from './pages/Detail';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorite from './pages/Favorite';

function App() {

  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<DetailPage />} />
          <Route path="/favorite" element={<Favorite/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
