import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
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
      <div className="cover-box">
        <div className="cover-overlay">
          <h3>{pokemon.name.english}</h3>
        </div>
      </div>
      <Row className="mt-5"></Row>
    </Col>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default SinglePokemon;
