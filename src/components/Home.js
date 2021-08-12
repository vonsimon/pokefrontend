import { useState, useEffect } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_POKEMON}`);
        setPokemons(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        } else {
          setError('Network error');
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        }
      }
    };
    !error && getPokemons();
  }, [error]);

  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;
  return pokemons.map(pokemon => (
    <Col md={4} className='mb-4' key={pokemon.id}>
      <Card>
        <Card.Body>
          <Card.Title>
            {pokemon.name.english} <Badge bg='success'>{pokemon.type}</Badge>
          </Card.Title>
          <img onError={(event)=> {
            event.target.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
            event.target.width = '50'
          }} src={`https://projectpokemon.org/images/normal-sprite/${pokemon.name.english.toLowerCase()}.gif`}/>
          <Card.Text
          ></Card.Text>
          <Button variant='primary' as={Link} to={`/pokemon/${pokemon.id}`}>
            Read article
          </Button>
        </Card.Body>
        <Card.Footer>{pokemon.name.english}</Card.Footer>
      </Card>
    </Col>
  ));
};

export default Home;