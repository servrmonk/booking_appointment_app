import BookingAppForm from "./Components/form.takingInput";
import ShowingOutput from "./Components/form.showingOutput";
import { MainContextProvider } from "./Context/mainContext";


function App() {
  return (
    <MainContextProvider>
      <BookingAppForm />
      <ShowingOutput />
    </MainContextProvider>
  );
}

export default App;
