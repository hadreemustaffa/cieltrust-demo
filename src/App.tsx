import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/yourbank/" element={<Home />} />

      {/* <Route path='/404' element={<NotFound />} /> */}

      {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
