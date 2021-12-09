import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = async () => {
        let response;
        try {
            response = await axios.post('http://reacttrainingbackend.azurewebsites.net/product/add/', {
                Name: name,
                Description: description,
                CategoryId: '50A3EE5F-5ADD-4A63-87CF-7922776812F2',
                CreatedByUserId: "99421113",
            });
        } catch(e) {
            console.log('error', e);
        }

        if (response) {
            console.log(response);
        }

        history.push('/products');
    };

    return (
        <Stack spacing={4}>
            <TextField label="Name" defaultValue={name} onChange={e => setName(e.target.value.trim())} />
            <TextField
                label="Description"
                multiline
                rows={5}
                defaultValue={description}
                onChange={e => setDescription(e.target.value.trim())}
            />
            <div>
                <Button variant="contained" onClick={submit}>
                    Submit
                </Button>
            </div>
        </Stack>
    );
};

export default AddProduct;
