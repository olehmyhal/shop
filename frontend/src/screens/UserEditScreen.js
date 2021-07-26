import React , {useEffect , useState} from 'react'
import {Link} from 'react-router-dom'
import {Form , Button} from 'react-bootstrap'
import {useDispatch , useSelector} from 'react-redux'

import {Message , Loader , FormContainer} from '../components'
import { getUserDetails , updateUser} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match , history}) => {
    const dispatch = useDispatch()

    const userId = match.params.id

    const userDetails = useSelector(state => state.userDetails)
    const {loading , error , user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate , error: errorUpdate , success: successUpdate} = userUpdate

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [isAdmin , setIsAdmin] = useState(false)

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== userId ){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    } , [dispatch , userId , user , successUpdate , history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: userId , name , email , isAdmin}))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Adrres</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox' label='Is admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
