import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

import { FiUser, FiScissors } from 'react-icons/fi'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { ScheduleItem } from "../../pages/dashboard";

interface ModalInfoProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    data: ScheduleItem
    finishService: () => Promise<void>
}

export function ModalInfo({ data, finishService, isOpen, onClose, onOpen }: ModalInfoProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>

            <ModalContent bg='barber.400'>
                <ModalHeader color='gray.200'>Próximo</ModalHeader>
                <ModalCloseButton color='gray.200'/>

                <ModalBody>
                    <Flex align='center' mb={3}>
                        <FiUser size={28} color='#ffb13e'/>
                        <Text color='gray.200' ml={3} fontSize='2xl' fontWeight='bold'>{data?.customer}</Text>
                    </Flex>

                    <Flex align='center' mb={3}>
                        <FiScissors size={28} color='#087cba'/>
                        <Text color='gray.200' ml={3} fontSize='large' fontWeight='bold'>{data?.haircut.name}</Text>
                    </Flex>

                    <Flex align='center' mb={3}>
                        <FaMoneyBillAlt size={28} color='#46ef75'/>
                        <Text color='gray.200' ml={3} fontSize='large' fontWeight='bold'>R$ {data?.haircut.price}</Text>
                    </Flex>

                    <ModalFooter>
                        <Button
                        bg='button.cta'
                        _hover={{ bg: '#ffb13e' }}
                        color='#fff'
                        mr={3}
                        onClick={() => finishService()}
                        >
                            Finalizar Serviço
                        </Button>
                    </ModalFooter>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}