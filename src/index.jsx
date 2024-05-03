import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
//import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import './index.scss';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    rreturn(
        <Container style={{ border: "1px solid red" }}>
            <MainView />
        </Container>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);