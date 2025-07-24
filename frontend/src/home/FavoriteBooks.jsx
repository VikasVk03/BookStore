import { useEffect, useState } from "react"
import BookCards from "../components/BookCards"
// import { data } from "react-router-dom"


const FavoriteBooks = () => {
    const [books, setbooks] = useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/all-books").then(res => res.json()).then(data => setbooks(data))
    })
  return (
    <div>
      <BookCards books={books} headline = "Best Seller Books"/>
    </div>
  )
}

export default FavoriteBooks
