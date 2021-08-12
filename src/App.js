import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SinglePokemon from './components/SinglePokemon';

const App = () => {
  return (
    <main>
      <Navigation />
      <Container>
        <Row className='mt-5 justify-content-center'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/pokemon/:id' component={SinglePokemon} />
            <Route />
          </Switch>
        </Row>
      </Container>
    </main>
  );
};

export default App;