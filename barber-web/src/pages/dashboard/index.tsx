import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";

import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";
import { ModalInfo } from "../../components/modal";

export interface ScheduleItem {
  id: string
  customer: string
  haircut: {
    id: string
    name: string
    price: string | number
    user_id: string
  }
}

interface DashboardProps {
 schedule: ScheduleItem[]
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(schedule)
  const [service, setService] = useState<ScheduleItem>()

  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleOpenModal(item: ScheduleItem) {
    setService(item)
    onOpen()
  }

  async function handleFinishService(id: string) {

    try {

      const apiClient = setupAPIClient()
      await apiClient.delete('/schedule', {
        params: {
          schedule_id: id
        }
      })

      const filterItem = scheduleList.filter(item => {
        return (item.id != id)
      })

      setScheduleList(filterItem)

      onClose()
      
    } catch (error) {
      console.log(error)

      onClose()
    }

  }

  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color='gray.200'>
              Agenda
            </Heading>
            <Link href="/new">
              <Button bg='gray.700' _hover={{ background: 'gray.600' }}>Registrar</Button>
            </Link>
          </Flex>

          {scheduleList.map(item => (
            <ChakraLink
            onClick={() => handleOpenModal(item)}
            key={item.id}
            w="100%"
            m={0}
            p={0}
            mt={1}
            bg="transparent"
            style={{ textDecoration: "none" }}
          >
            <Flex
              w="100%"
              direction={isMobile ? "column" : "row"}
              p={4}
              rounded={4}
              mb={4}
              bg="barber.400"
              justify="space-between"
              align={isMobile ? "flex-start" : "center"}
              color='gray.200'
            >
              <Flex
                direction="row"
                mb={isMobile ? 2 : 0}
                align="center"
                justify="center"
              >
                <IoMdPerson size={28} color="#f1f1f1" />
                <Text fontWeight="bold" ml={4} noOfLines={1}>
                  {item.customer}
                </Text>
              </Flex>

              <Text fontWeight="bold" mb={isMobile ? 2 : 0}>
                {item.haircut.name}
              </Text>
              <Text fontWeight="bold" mb={isMobile ? 2 : 0}>
                R$ {item.haircut.price}
              </Text>
            </Flex>
          </ChakraLink>
          ))}

        </Flex>
      </Sidebar>

      <ModalInfo
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      data={service}
      finishService={() => handleFinishService(service.id)}
      />
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try {

    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/schedules')

    return {
      props: {
        schedule: response.data
      }
    }

  } catch (error) {
    console.log(error)

    return {
      props: {
        schedule: []
      }
    }
  }
});
