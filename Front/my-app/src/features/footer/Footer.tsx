
import { Link } from 'react-router-dom'

/**
 * Component for displaying the footer with navigation links.
 *
 * @component
 */
const Footer = () => {
  return (
    <div>
      <footer className="bg-dark py-4 d-flex justify-content-center w-100">
        <div className="d-flex justify-content-center container">
          <Link to="/about" className="btn btn-link text-white mx-2">About</Link>
          <Link to="/donations" className="btn btn-link text-white mx-2">Donations</Link>
          <Link to="/tutorial" className="btn btn-link text-white mx-2">Tutorial</Link>
          <Link to="/contact" className="btn btn-link text-white mx-2">Contact Us</Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer