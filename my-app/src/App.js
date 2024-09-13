import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./reducers/userReducer";
import axios from "axios";


import CaroPage from "./pages/CaroManager/CaroPage";
import SnakePage from "./pages/SnakePage";
import MenuGame from "./pages/MenuGame";
import NickName from "./pages/NickName";
import FindMatch from "./pages/FindMatch";
import CaroMatch from "./pages/CaroManager/CaroMatch";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/CaroManager/HistoryPage";

const Routing = () => (
  <Routes>
    <Route path="/" element={<MenuGame />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/caro" element={<CaroPage />} />
    <Route path="/snake" element={<SnakePage />} />
    <Route path="/nickname" element={<NickName />} />
    <Route path="/caro/f/:id" element={<FindMatch />} />
    <Route path="/caro/r/:id" element={<CaroMatch />} />
    <Route path="/caro/r/:id/:pass" element={<CaroMatch />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
function App() {
  const [loading, setLoading] = useState(true);
  console.log("twice");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authUser = async () => {
      console.log("oke bro")
      try {
        const response = await axios.get(
          "/api/user",

        );
        const { data } = response;
        if (data) {
          console.log("data : ", data);
          if (data.onGame != null) {
            // if stay at it already;

            navigate(`/caro/r/${data.onGame._id}`)
          }
          sessionStorage.setItem("user", JSON.stringify(data));
          console.log("dfata");
          dispatch(login(data));
          setLoading(false);



        }
      } catch (error) {
        console.log(error);
        const errorData = error.response?.data;
        if (errorData?.cookie === false) {
          setLoading(false)
          navigate("/nickname", { state: { cookie: false } });
        } else if (errorData?.user === false) {
          setLoading(false);
          navigate("/cookieError", { state: { type: "cookie" } });
        }
      }

    };

    authUser();
  }, []); // Added dependencies here

  return (<>


    {loading ? <div id="spinnerOverlay" class=" fixed inset-0 bg-stone-100 bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-white border-t-transparent"></div>
      <h3>Loading</h3>
    </div> : <div >
      <Routing />
    </div>}
  </>
  );
}

export default App;
// dispatch make page re render twice;