import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_BLOG_API}/posts/${id}`);
        setPost(data);
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
    !error && getPosts();
  }, [id, error]);

  if (error) return <Alert variant='danger'>{error}</Alert>;
  if (loading) return <Spinner animation='border' variant='primary' />;

  return (
    <Col>
      <div className='cover-box'>
        <img src={post.cover} className='cover-img' alt={post.title} />
        <div className='cover-overlay'>
          <h3>{post.title}</h3>
        </div>
      </div>
      <Row className='mt-5'>
        <Col dangerouslySetInnerHTML={{ __html: post.body }}></Col>
      </Row>
    </Col>
  );
};

export default SinglePost;