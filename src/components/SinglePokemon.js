import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import axios from "axios";

const SinglePokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_POKEMON}/${id}`
        );
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        } else {
          setError("Network error");
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        }
      }
    };
    !error && getPokemon();
  }, [id, error]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return !loading && pokemon.name ? (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>
            <h3>
              {pokemon.name.english}
              <> </>
              <Badge bg="success">{pokemon.type[0]}<> </>{pokemon.type[1]}<> </>{pokemon.type[2]}</Badge>
            </h3>
          </Card.Title>
          <div className="cover-box">
            <div className="cover-overlay">
              <img
                onError={(event) => {
                  event.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
                  event.target.width = "50";
                }}
                src={`https://projectpokemon.org/images/normal-sprite/${pokemon.name.english.toLowerCase()}.gif`}
                alt=""
              />
              <Card.Text>
                <h5>HP: {pokemon.base.HP}</h5>
                <h5>Attack: {pokemon.base.Attack}</h5>
                <h5>Defense: {pokemon.base.Defense}</h5>
                <h5>Special Attack: {pokemon.base.Sp_Attack}</h5>
                <h5>Special Defense: {pokemon.base.Sp_Defense}</h5>
                <h5>Speed: {pokemon.base.Speed}</h5>
              </Card.Text>
            </div>
          </div>
          <Row className="mt-5"></Row>
        </Card.Body>
      </Card>
    </Col>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default SinglePokemon;
