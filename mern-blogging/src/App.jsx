import { BrowserRouter, Link, Route, Routes } from "react-router-dom"


const Home = () => <h1>Home Page</h1>
const About = () => <h1>About Page</h1>


const App = () => {
  return (
    <BrowserRouter>
    <div>
        <Link to={"/"}>Home </Link>
        <Link to={"/about"}>About</Link>
    </div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App