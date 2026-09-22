import { Link } from 'react-router-dom';

const WebHeader = () => {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/about" style={{ marginRight: '10px' }}>About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    )
}

export default WebHeader