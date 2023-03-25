import { Box, Text, Center, Button, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CreateNotepad() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const url = "http://localhost:3001"

    function handleTitleChange(e) {
        setTitle(e.target.value);
    };

    function handleContentChange(e) {
        setContent(e.target.value);
    };

    async function handleCreate() {
        if (title === "" || content === "") {
            alert("Please complete all fields!");
        }
        else {
            var inputData = {
                title: title,
                content: content
            };
            var newNotepad = await axios.post(url, inputData);
            clearData();
            alert("Notepad added successfully!")
            console.log(newNotepad);
        };
    }

    const clearData = () => {
        setTitle('');
        setContent('');
    }

    return (
        <>
            <Box pt={15}>
                <Center>
                    <Box boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' padding={5} textAlign={'center'} >
                        <Text fontWeight='bold' fontSize={'3xl'} mb='5' >
                            Create Notepad
                        </Text>
                        <Input
                            type={'text'}
                            placeholder='Your title here'
                            value={title}
                            onChange={handleTitleChange}
                            isRequired
                        />
                        <Textarea
                            type={'text'}
                            my='5' rows={7}
                            placeholder='Your content here'
                            value={content}
                            onChange={handleContentChange}
                            isRequired
                        />
                        <Button
                            mb={5}
                            width={'100%'}
                            colorScheme={'linkedin'}
                            onClick={handleCreate}
                        >
                            Create
                        </Button>
                        <Link to={"/"}>
                            <Button width={'100%'} colorScheme={'gray'} >
                                Home Page
                            </Button>
                        </Link>
                    </Box>
                </Center>
            </Box>
        </>
    )
}

