import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://react-learning-db-83690.firebaseio.com/"
});

export default instance;
