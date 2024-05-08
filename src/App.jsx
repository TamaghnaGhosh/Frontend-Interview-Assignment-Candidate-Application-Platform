import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import InfiniteScrollwithFilters from "./Component/InfiniteScroll";
import store from "./utils/Redux/store";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <InfiniteScrollwithFilters />,
    children: [
      
      // {
      //   path: "/search/:searchID",
      //   element: (
      //       <YouTubeSearch />
      //   ),
      // },
    ],

    //This component helps when it gets a 404 error (errorElement)
    // errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
};

export default App;
