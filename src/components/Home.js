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
        const { data } = await axios.get(`${process.env.REACT_APP_POKEMON}/pokemon`);
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
  return pokemons.map(post => (
    <Col md={4} className='mb-4' key={pokemons._id}>
      <Card>
        <Card.Img variant='top' src={pokemons.cover} style={{ objecFit: 'cover' }} />
        <Card.Body>
          <Card.Title>
            {pokemons.title} <Badge bg='success'>{pokemons.genre}</Badge>
          </Card.Title>
          <Card.Text
          ></Card.Text>
          <Button variant='primary' as={Link} to={`/pokemon/${pokemons._id}`}>
            Read article
          </Button>
        </Card.Body>
        <Card.Footer>Author: {pokemons.author}</Card.Footer>
      </Card>
    </Col>
  ));
};

export default Home;