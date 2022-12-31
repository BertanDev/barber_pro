import Head from "next/head";
import { Sidebar } from "../../components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { ChangeEvent, useState } from "react";

interface HaircutItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [haircutList, setHaircutsList] = useState<HaircutItem[]>(haircuts || []);
  const [disableHaircut, setDisableHaircut] = useState('enabled')

  const [isMobile] = useMediaQuery("(max-width: 500px)");

  async function handleDisable(event: ChangeEvent<HTMLInputElement>) {
    
    const apiClient = setupAPIClient()

    if(event.target.value === 'disabled') {
      setDisableHaircut("enabled")

      const response = await apiClient.get('/haircuts', {
        params: {
          status: true
        }
      })

      setHaircutsList(response.data)

    } else {
      setDisableHaircut('disabled')

      const response = await apiClient.get('/haircuts', {
        params: {
          status: false
        }
      })

      setHaircutsList(response.data)
    }

  }

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button bg='gray.700' _hover={{ background: 'gray.600' }}>Cadastrar novo</Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold" color="gray.300">
                ATIVOS
              </Text>
              <Switch
              colorScheme="green" 
              size="lg" 
              value={disableHaircut}
              onChange={(e) => handleDisable(e)}
              isChecked={disableHaircut === 'disabled' ? false : true}
              />
            </Stack>
          </Flex>

          {haircutList.map((item) => {
            return (
              <Link key={item.id} href={`/haircuts/${item.id}`}>
                <Flex
                  cursor="pointer"
                  w="25.4rem"
                  p={4}
                  bg="barber.400"
                  direction={isMobile ? "column" : "row"}
                  alignItems={isMobile ? "flex-start" : "center"}
                  rounded="4"
                  mb={2}
                  justifyContent="space-between"
                >
                  <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IoMdPricetag size={28} color="#fba931" />
                    <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                      {item.name}
                    </Text>
                  </Flex>

                  <Text fontWeight="bold" color="white">
                    Preço: R$ {item.price}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    console.log(response.data)

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
