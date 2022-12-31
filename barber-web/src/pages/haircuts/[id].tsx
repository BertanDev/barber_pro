import {
  Heading,
  Flex,
  useMediaQuery,
  Button,
  Text,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
import Head from "next/head";
import { Sidebar } from "../../components/sidebar";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { setupAPIClient } from "../../services/api";
import { ChangeEvent, useState } from "react";

interface HaircutProps {
    id: string
    name: string
    price: string | number
    status: boolean
    user_id: string
}

interface SubscriptionProps {
    id: string
    status: string
}

interface EditHaircutProps {
    haircut: HaircutProps
    subscription: SubscriptionProps | null
}

export default function EditHaircut({ haircut, subscription }: EditHaircutProps) {
    const [name, setName] = useState(haircut?.name)
    const [price, setPrice] = useState(haircut?.price)
    const [status, setStatus] = useState(haircut?.status)

    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? 'disabled' : 'enabled')

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
        if(event.target.value === 'disabled') {
            setDisableHaircut('enabled')
            setStatus(false)
        } else {
            setDisableHaircut('disabled')
            setStatus(true)
        }
    }

    async function handleUpdate() {
        if(name === '' || price === '') {
            return
        }

        try {
            
            const apiClient = setupAPIClient()

            await apiClient.put('/haircut', {
                name: name,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id
            })

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
      <Head>
        <title>BarberPRO </title>
      </Head>

      <Sidebar>
        <Flex direction="column" align="flex-start" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                mr={3}
                background="gray.800"
                p={4}
                display="flex"
                justifyContent="center"
                bg='gray.700' _hover={{ background: 'gray.600' }}
              >
                <FiChevronLeft size={24} color="#FFF" />
                <Text color="#FFF">Voltar</Text>
              </Button>
            </Link>

            <Heading fontSize={isMobile ? "22px" : "3xl"} color="#FFF">
              Editar corte
            </Heading>
          </Flex>

          <Flex
            mt={8}
            maxW="700px"
            pt={8}
            pb={8}
            w="100%"
            bg="barber.400"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="#FFF">Editar corte</Heading>

            <Flex w="85%" direction="column" mt={4}>
              <Input
                placeholder="Nome do corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="text"
                w="100%"
                color='gray.200'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="Preço do corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
                color='gray.200'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Stack mb={6} align="center" direction="row">
                <Text fontWeight='bold'>Desativar corte</Text>

                <Switch
                size='lg'
                colorScheme='red'
                value={disableHaircut}
                isChecked={disableHaircut === 'disabled' ? false : true}
                onChange={(e) => handleChangeStatus(e)}
                />
              </Stack>

                <Button
                mb={6}
                w='100%'
                bg='button.cta'
                color='gray.900'
                _hover={{ bg: '#ffb13e' }}
                disabled={subscription?.status !== 'active'}
                onClick={handleUpdate}
                >
                    Salvar
                </Button>

                {subscription?.status !== 'active' && (
                    <Flex direction='row' align='center' justify='center'>
                        <Link href='/planos'>
                            <Text cursor='pointer' fontWeight='bold' mr={1} color='#31fb6a'>
                                Seja premium
                            </Text>
                        </Link>

                        <Text color='gray.200'>
                            e tenha todos os acessos liberados.
                        </Text>
                    </Flex>
                )}

            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params

    try {

        const apiClient = setupAPIClient(ctx)

        const check = await apiClient('/check')

        const response = await apiClient.get('/haircut/detail', {
            params: {
                haircut_id: id,
                subscription: check
            }
        })

        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions
            },
        };

    } catch (error) {
        console.log(error)

        return {
            redirect: {
                destination: '/haircuts',
                permanent: false
            }
        }
    }

});
