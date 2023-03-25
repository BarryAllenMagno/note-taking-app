import {
    Box,
    Text,
    Center,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    Textarea,
    FormControl
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { AiFillFileAdd, AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export default function Home() {

    React.useEffect(() => {
        async function fetchData() {
            loadData();
        }
        fetchData();
    }, []);
// isOpen={showAddedModal} onClose={handleShowAddedModal}>
    const url = "http://localhost:3001";
    const [notepadList, setNotepadList] = React.useState([]);
    const [id, setId] = React.useState(0);
    const [showUpdate, setShowUpdate] = React.useState(false);
    const [updatedNotepad, setUpdatedNotepad] = React.useState({});
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [titleError, setTitleError] = React.useState(false);
    const [contentError, setContentError] = React.useState(false);
    const [showAddedModal, setShowAddedModal] = React.useState(false);

    function handleSetShowAddedModal() {
        setShowAddedModal(false);
    }

    function handleCloseAddModal() {
        setShowAddModal(false)
    }

    function handleOpenAddModal() {
        setShowAddModal(true)
    }

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
                content: content,
                timestamp: new Date()
            };
            var newNotepad = await axios.post(url, inputData);
            clearData();
            // alert("Notepad added successfully!")
            setShowAddedModal(true);
            console.log(newNotepad);
            setShowAddModal(false);
            loadData();
        };
    }

    const clearData = () => {
        setTitle('');
        setContent('');
    }

    function handleCloseUpdateModal() {
        setShowUpdate(false);
    };

    async function loadData() {
        const response = await axios.get(url);
        setNotepadList(response.data);

    }

    function setShow(id) {
        setId(id);
        onOpen();
    }

    async function handleDelete() {
        var data = { _id: id };
        const deleteResult = await axios.delete(url, { data: data });
        setId(0)
        onClose();
        loadData();
        console.log(deleteResult);

    }

    async function handleUpdate(notepad) {
        setShowUpdate(true);
        setUpdatedNotepad(notepad);
        console.log(notepad);
    }

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedNotepad(prev => {
            return {
                ...prev,
                [name]: value
            };
        });

        if (name === "title" && value === "") {
            setTitleError(true);
        } else if (name === "content" && value === "") {
            setContentError(true);

        } else {
            setTitleError(false);
            setContentError(false);

        }

    };

    // async function saveUpdatedNotepad() {
    //     console.log(updatedNotepad);
    //     await axios.put(url, updatedNotepad)
    //     setShowUpdate(false);
    //     loadData();
    // }
    async function saveUpdatedNotepad() {

        if (updatedNotepad.title === "" || updatedNotepad.content === "") {
            alert("Please complete all fields!");
        }
        else {


            const updatedTimestamp = new Date(); // Get current date and time
            const updatedNotepadWithTimestamp = {
                ...updatedNotepad,
                timestamp: updatedTimestamp // Include timestamp field with current date and time
            };
            console.log(updatedNotepadWithTimestamp);
            await axios.put(url, updatedNotepadWithTimestamp);
            setShowUpdate(false);
            loadData();
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box p={15} >
                <Center>
                    <Box bg='#f5f8fd' padding={5} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' width={{ base: '100%', md: '50%' }} textAlign={'center'} >
                        <Flex px={5} justifyContent={'space-between'} >
                            <Text fontWeight='bold' fontSize={'3xl'} mb='5' >
                                Notepad
                            </Text>
                            <Button
                                display={{ base: 'none', md: 'flex' }}
                                rightIcon={<AiFillFileAdd />}
                                borderRadius={1} variant={'solid'}
                                color='white'
                                colorScheme={'messenger'}
                                onClick={handleOpenAddModal}
                            >
                                Add Notepad
                            </Button>
                            <Button
                                display={{ base: 'flex', md: 'none' }}
                                borderRadius={1} variant={'solid'}
                                color='white'
                                colorScheme={'messenger'}
                                onClick={handleOpenAddModal}
                            >
                                <AiFillFileAdd />
                            </Button>
                        </Flex>

                        {notepadList.length > 0 ? notepadList.map((notepad, index) =>
                            <Box textAlign={'start'} bg='white' mx={5} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' p={5} mb={5} key={index} >
                                <Flex justifyContent={'space-between'} >
                                    <Text color={'green.400'} fontWeight={'bold'} fontSize={'2xl'} >{notepad.title}</Text>
                                    <Flex>
                                        <Text mr={5} cursor={'pointer'} color={'green.400'} onClick={() => handleUpdate(notepad)} >
                                            <AiFillEdit fontSize={'20px'} />
                                        </Text>
                                        <Text cursor={'pointer'} color={'red.500'} onClick={() => setShow(notepad._id)} >
                                            <BsFillTrashFill fontSize={'19px'} />
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Text fontSize={'xl'} >{notepad.content}</Text>
                                <Text mt={1} color={'gray'}>{new Date(notepad.timestamp).toLocaleString()}</Text>
                            </Box>
                        ) : <Text>No available notepad.</Text>}

                    </Box>
                </Center>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirmation</ModalHeader>
                        <ModalCloseButton />
                        < ModalBody >
                            Are you sure you want to delete this notepad?
                        </ModalBody>
                        < ModalFooter >
                            <Button colorScheme='gray' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme={'red'} variant='solid' onClick={handleDelete} >Delete</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Modal isOpen={showUpdate} onClose={handleCloseUpdateModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Update Notepad</ModalHeader>
                        <ModalCloseButton />
                        < ModalBody >
                            {titleError && <Text color="red">Title is required</Text>}
                            <Input
                                mb="5"
                                placeholder="Your title here"
                                name="title"
                                value={updatedNotepad.title ? updatedNotepad.title : ""}
                                onChange={handleUpdateChange}
                                isRequired
                            />
                            {contentError && <Text color="red" >Content is required</Text>}
                            <Textarea
                                rows={10}
                                placeholder="Your title here"
                                name="content"
                                value={updatedNotepad.content ? updatedNotepad.content : ""}
                                onChange={handleUpdateChange}
                                isRequired
                            />

                        </ModalBody>
                        < ModalFooter >
                            <Button colorScheme='gray' mr={3} onClick={handleCloseUpdateModal}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme={'green'}
                                variant='solid'
                                onClick={saveUpdatedNotepad}
                            >
                                Save changes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Modal isOpen={showAddModal} onClose={handleCloseAddModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Notepad</ModalHeader>
                        <ModalCloseButton />
                        < ModalBody >
                            <Input
                                type={'text'}
                                placeholder='Your title here'
                                value={title}
                                onChange={handleTitleChange}
                                isRequired
                            />
                            <Textarea
                                type={'text'}
                                my='5' rows={10}
                                placeholder='Your content here'
                                value={content}
                                onChange={handleContentChange}
                                isRequired
                            />
                        </ModalBody>
                        < ModalFooter >
                            <Button colorScheme='gray' mr={3} onClick={handleCloseAddModal}>
                                Cancel
                            </Button>
                            <Button colorScheme={'messenger'} variant='solid' onClick={handleCreate} >Create</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <Modal isOpen={showAddedModal} onClose={handleSetShowAddedModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Notepad</ModalHeader>
                        <ModalCloseButton />
                        < ModalBody >
                            <Text color={'green.400'} fontWeight={'bold'} fontSize='xl' >Note added successfully!</Text>
                        </ModalBody>
                        < ModalFooter >
                            <Button colorScheme={'messenger'} variant='solid' onClick={handleSetShowAddedModal} >Ok</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    )
}
