import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate()
    const { keyword: urlKeyword } = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || "")

    const submitHandler = async (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            setKeyword('')
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }
    return (

        <Form className="d-flex" onSubmit={submitHandler}>
            <Form.Control
                type="text"
                value={keyword}
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button
                type="submit"
                variant="outline-light"
                className="p-2"
            >
                Search
            </Button>

        </Form>
    )
}

export default SearchBox
