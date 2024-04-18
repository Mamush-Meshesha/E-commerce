import { Link,useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Message from "../../components/message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"

import { useGetUserDetailsQuery,useUpdateUserMutationMutation} from "../../slices/userApiSlice"

const UserEditScreen = () => {

    const { id: userId } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, error,refetch } = useGetUserDetailsQuery(userId)
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutationMutation()
    
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    },[user])

    const submitHandler =async (e) => {
        e.preventDefault()
        try {
            await updateUser({ userId, name, email, isAdmin })
            toast.success("User updated successfully")
            refetch()
            navigate("/admin/userlist")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }
    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? <Loader /> : error ? (
                    
                    <Message variant='danger'>
                        {error}
                    </Message>
                ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Is Admin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>
                            <Button type="submit" variant="primary">update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen