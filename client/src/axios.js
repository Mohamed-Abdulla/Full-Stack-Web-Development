import axios from "axios";

//base url to make requests to the movie tmdb database

const instance = axios.create({
  //create an instance of axios to get the data from the baseurl

  baseURL: "https://api.themoviedb.org/3/",
});
//this gets last part of the url which is main part
// instance.get('foo-bar')
export default instance; //when we use default export , we can call by any name
//we can use default once in a file
